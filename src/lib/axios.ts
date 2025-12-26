import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'

// 成功響應處理（返回 tuple）
const SuccessRes = <T>(response: AxiosResponse<T>): [T, null, any] => {
  return [response.data, null, response]
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

// --- admin (returns tuple) ---
const api = axios.create({
  baseURL: `${getBackendHost()}/api-admin`,
})

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const authStore = useAuthStore()
  if (config.headers) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

// admin 包裝器，返回 tuple 格式
export const admin = async (config: any): Promise<[any, null, any] | [null, any, any]> => {
  try {
    const response = await adminInstance(config)
    return SuccessRes(response)
  } catch (error) {
    return ErrorRes(error)
  }
}
