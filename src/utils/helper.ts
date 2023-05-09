import { get } from 'lodash-es'
import { useAppStore } from '@/stores/app'
import dayjs from 'dayjs'

export const getHost = (hostName: string) => {
  const appStore = useAppStore()
  return get(appStore.apiEndPoints, hostName)
}

export const dateFormat = (
  dateTime: string | Date,
  dateFormat: string = 'YYYY/MM/DD HH:mm',
): string => {
  return dayjs(dateTime).format(dateFormat)
}
