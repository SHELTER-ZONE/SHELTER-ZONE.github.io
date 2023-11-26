import { get } from 'lodash-es'
import { useAppStore } from '@/stores/app'
import dayjs from 'dayjs'
import { h } from 'vue'
import { NIcon } from 'naive-ui'

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

export const wait = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const renderIcon = (icon: Component, props: any = null) => {
  return () => {
    return h(NIcon, props, {
      default: () => h(icon),
    })
  }
}
