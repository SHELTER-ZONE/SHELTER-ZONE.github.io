import localStoreKey from '@/configs/localStoreKey'
import { useStorage } from '@vueuse/core'
import { get } from 'lodash-es'
import dayjs from 'dayjs'
import { useRoute, useRouter } from 'vue-router'

export const useErrorPage = () => {
  const route = useRoute()
  const router = useRouter()

  const errorPageData = useStorage<{
    code?: string
    message?: string
    [propName: string]: any
  }>(localStoreKey.errorPageData, {}, sessionStorage)

  const routeToErrorPage = (errorType?: string) => {
    router.replace({ name: 'Error', query: { errorType } })
  }

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

  const handleToErrorPage = ({
    errData,
    rawErr,
    context,
    errorType,
  }: {
    errData: any
    rawErr?: any
    context?: string
    errorType?: string
  }) => {
    errorPageData.value = {
      status: errData.status || rawErr.status || '-',
      code: errData.code || rawErr.code || '-',
      message: errData.message || rawErr.message || '-',
      context: context || '-',
      ...rawErrorDataFormat(rawErr),
    }

    routeToErrorPage(errorType)
  }

  return {
    errorPageData,
    rawErrorDataFormat,
    routeToErrorPage,
    handleToErrorPage,
  }
}
