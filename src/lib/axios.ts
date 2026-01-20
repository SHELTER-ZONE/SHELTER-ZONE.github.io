import { useUserStore } from '@/stores/user'
import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import { get } from 'lodash-es'

// 成功響應處理（返回 tuple）
const SuccessRes = <T>(response: AxiosResponse<T>): [T, null, any] => {
  return [get(response.data, 'data') || response.data, null, response]
}

// 錯誤響應處理（返回 tuple）
const ErrorRes = (error: any): [null, string | { code: string; msg: string }, any] => {
  const msg = error.response?.data?.message || error.message || 'Unknown error'
  const type = error.response?.data?.code ? 'Error' : 'Exception'
  return [null, `${type}: ${msg}` || error.message, error.response?.data]
}

// 獲取後端主機地址
const getBackendHost = () => {
  // TODO: 從 configuration 或環境變數中獲取
  return import.meta.env.VITE_BACKEND_HOST || 'http://localhost:3000'
}

export const api = axios.create({
  baseURL: `${getBackendHost()}`,
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const userStore = useUserStore()
  if (config.headers) {
    config.headers.Authorization = `Bearer ${userStore.userToken}`
  }
  return config
})

export const szBackend = async (config: any): Promise<[any, null, any] | [null, any, any]> => {
  try {
    const response = await api(config)
    return SuccessRes(response)
  } catch (error) {
    return ErrorRes(error)
  }
}
