import localStoreKey from '@/configs/localStoreKey'
import { useStorage } from '@vueuse/core'
import { get } from 'lodash-es'
import dayjs from 'dayjs'
import { useRoute } from 'vue-router'

export const useErrorPage = () => {
  const route = useRoute()

  const errorPageData = useStorage<{
    code?: string
    message?: string
    [propName: string]: any
  }>(localStoreKey.errorPageData, {}, sessionStorage)

  const rawErrorDataFormat = (rawErr: Error) => {
    if (!rawErr) return {}
    return {
      requestUrl: `${get(rawErr, 'config.method')} | ${get(
        rawErr,
        'config.url',
      )}`,
      headers: get(rawErr, 'config.headers'),
      payload: get(rawErr, 'config.data'),
      page: route.fullPath,
      timestamp: dayjs().format('YYYY/MM/DD HH:mm:ss'),
    }
  }

  return { errorPageData, rawErrorDataFormat }
}
