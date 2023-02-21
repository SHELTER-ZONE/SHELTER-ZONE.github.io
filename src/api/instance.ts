import axios from 'axios'

//= > api-auth
export const api = axios.create()

api.interceptors.request.use(async (config) => {
  return config
})

//= > handler
const handleSuccessRes = (response: any) => {
  return [response.data, null]
}

const handleErrorRes = (error: any) => {
  const errMsg = error.response.data?.error?.message
  return [null, errMsg || error.response.data]
}

//= > use
api.interceptors.response.use(handleSuccessRes, handleErrorRes)
