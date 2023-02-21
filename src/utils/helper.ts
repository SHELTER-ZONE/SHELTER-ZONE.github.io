import { get } from 'lodash-es'
import { useAppStore } from '@/stores/app'

export const getHost = (hostName: string) => {
  const appStore = useAppStore()
  return get(appStore.apiEndPoints, `apiEndPoints.${hostName}`)
}
