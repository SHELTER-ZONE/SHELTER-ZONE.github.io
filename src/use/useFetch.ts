import { isRef, isReactive, type Ref, reactive } from 'vue'
import { get, set } from 'lodash-es'

interface FetchDataOptions {
  toastError?: boolean
  console?: boolean
}

export const useFetch = () => {
  const fetchData = async <P>(
    apiMethod: Function,
    payload: P | null,
    onSuccess: Function,
    onError: Function,
    options?: FetchDataOptions,
  ) => {
    const [res, err]: any = await apiMethod(payload)
    if (options?.console) console.log(res, err)
    if (res) {
      await onSuccess(res)
    }
    if (err) {
      if (options?.toastError) window.$message.error(err)
      await onError(err)
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
    const [res, err]: any = await apiMethod(payload)
    if (options?.console) console.log(res, err)
    if (res) {
      let data = res.data
      if (dataPath) data = get(res.data, dataPath)
      console.log(valueRef)
      console.log(isReactive(valueRef))
      if (isRef(valueRef.ref)) valueRef.ref.value = data
      if (isReactive(valueRef.ref))
        set(valueRef.ref, valueRef.path as string, data)
    }
    if (err) {
      if (options?.toastError) window.$message.error(err)
    }
  }

  return { fetchData, fetchDataToValue }
}
