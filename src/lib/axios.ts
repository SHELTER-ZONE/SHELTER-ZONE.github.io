import axios, { type AxiosResponse } from 'axios'
import { get, toNumber } from 'lodash'
import { RouteBases } from 'discord-api-types/v10'

//= > api-auth
export const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'https://service-dev.shelterzone.net'
    : 'https://service.shelterzone.net',
})

export const apiAuth = axios.create({
  baseURL: import.meta.env.DEV
    ? 'https://service-dev.shelterzone.net'
    : 'https://service.shelterzone.net',
  headers: {
    Authorization: localStorage.getItem('szUserToken'),
  },
})

export const discord = axios.create({
  baseURL: RouteBases.api,
})

api.interceptors.request.use(async (config) => {
  return config
})

apiAuth.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('szUserToken')
  return config
})
discord.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('dcUserToken')}`
  return config
})

const formatResponse = (response: AxiosResponse, responseCode?: string) => {
  if (responseCode === 'ERR_NETWORK') {
    return {
      status: 530,
      code: responseCode,
      message: 'network error',
    }
  }
  const data = response.data

  const status = get(data, 'status') || response.status
  let code = get(data, 'code')
  let message = get(data, 'message')
  if (toNumber(status) === 429) {
    message = '429: Too Many Requests'
    code = 'TOO_MANY_REQUESTS'
  }

  return {
    status,
    code,
    message,
    data: get(data, 'data') || data,
  }
}

//= > handler
const handleSuccessRes = (response: any): any => {
  return [formatResponse(response), null]
}

const handleErrorRes = (error: any) => {
  return [null, formatResponse(error.response, error.code), error.response]
}

//= > use
api.interceptors.response.use(handleSuccessRes, handleErrorRes)
apiAuth.interceptors.response.use(handleSuccessRes, handleErrorRes)
discord.interceptors.response.use(handleSuccessRes, handleErrorRes)
