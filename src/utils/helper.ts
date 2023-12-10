import { get } from 'lodash-es'
import { useAppStore } from '@/stores/app'
import dayjs from 'dayjs'
import { h, type Component, type Ref } from 'vue'
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

export const checkForm = async (formRef: any) => {
  return new Promise((resolve) => {
    formRef.validate((errors: any) => {
      if (errors) return resolve(false)
      resolve(true)
    })
  })
}
