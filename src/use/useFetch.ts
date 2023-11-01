import { isRef, isReactive, type Ref, reactive } from 'vue'
import { get, set } from 'lodash-es'

interface FetchDataOptions {
  toastError?: boolean
  consoleRes?: boolean
}

const defaultOptions = (options?: FetchDataOptions): FetchDataOptions => ({
  toastError: true,
  consoleRes: true,
  ...options,
})

export const useFetch = () => {
  const fetchData = async <P>(
    apiMethod: Function,
    payload: P | null,
    onSuccess: Function,
    onError?: Function,
    options?: FetchDataOptions,
  ) => {
    options = defaultOptions(options)
    const [res, err]: any = await apiMethod(payload)
    if (options?.consoleRes) console.log(res, err)
    if (res) {
      await onSuccess(res)
    }
    if (err) {
      if (options?.toastError) window.$message.error(err.message)
      if (onError) await onError(err)
    }
  }

  const fetchDataToValue = async <P>(
    apiMethod: Function,
    payload: P | null,
    valueRef: {
      ref: Ref | object
      path?: string
    },
    dataPath?: string | null,
    options?: FetchDataOptions,
  ) => {
    options = defaultOptions(options)
    const [res, err, rawErr]: any = await apiMethod(payload)
    if (options?.consoleRes) console.log(res, err)
    if (res) {
      let data = res.data
      if (dataPath) data = get(res.data, dataPath)
      if (isRef(valueRef.ref)) valueRef.ref.value = data
      if (isReactive(valueRef.ref))
        set(valueRef.ref, valueRef.path as string, data)
    }
    if (err) {
      if (options?.toastError) window.$message.error(err.message)
    }
    return [res, err, rawErr]
  }

  const fetchDataReturn = async <P>(
    apiMethod: Function,
    payload: P | null,
    returnDataPath: string | null,
    options?: FetchDataOptions,
  ) => {
    options = defaultOptions(options)
    const [res, err]: any = await apiMethod(payload)
    if (options?.consoleRes) console.log(res, err)
    if (res) {
      if (returnDataPath) return get(res.data, returnDataPath)
      return res.data
    }
    if (err) {
      if (options?.toastError) window.$message.error(err.message)
      return null
    }
  }

  return { fetchData, fetchDataToValue, fetchDataReturn }
}
