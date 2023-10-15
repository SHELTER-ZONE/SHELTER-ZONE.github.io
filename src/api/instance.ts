import axios, { type AxiosResponse } from 'axios'
import { get } from 'lodash'

//= > api-auth
export const api = axios.create({
  baseURL: 'https://service.shelterzone.net',
})

export const apiAuth = axios.create({
  baseURL: 'https://service.shelterzone.net',
  headers: {
    Authorization: localStorage.getItem('szUserToken'),
  },
})

api.interceptors.request.use(async (config) => {
  return config
})

apiAuth.interceptors.request.use(async (config) => {
  return config
})

const formatResponse = (response: AxiosResponse) => {
  const data = response.data

  return {
    status: get(data, 'status') || response.status,
    code: get(data, 'code'),
    message: get(data, 'message'),
    data: get(data, 'data') || data,
  }
}

//= > handler
const handleSuccessRes = (response: any): any => {
  return [formatResponse(response), null]
}

const handleErrorRes = (error: any) => {
  return [null, formatResponse(error.response)]
}

//= > use
api.interceptors.response.use(handleSuccessRes, handleErrorRes)
apiAuth.interceptors.response.use(handleSuccessRes, handleErrorRes)
