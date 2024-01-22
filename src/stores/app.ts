import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { _SZ_MICROSERVICES_TABLE } from '@/configs/urls'
import { has, get, set, map } from 'lodash-es'
import { routes } from '@/router'

interface Signals {
  requestSignin: boolean
  signoutConfirm: boolean
}

export const useAppStore = defineStore('app', () => {
  const appLoading = ref<boolean>(true)
  const apiEndPoints = ref({})
  const keepAlivePagesConfig = ref<Record<string, { enabled: boolean }>>({})

  const signals = reactive<Signals>({
    requestSignin: false,
    signoutConfirm: false,
  })

  const getApiEndPoint = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: _SZ_MICROSERVICES_TABLE,
      })
      if (!res || !res.data) {
        alert('❗ 錯誤: 取得 api 失敗 !!')
        return
      }
      const endpoints = res.data
      const mode = import.meta.env.MODE
      if (mode === 'development') apiEndPoints.value = endpoints.dev
      if (mode === 'production') apiEndPoints.value = endpoints.prod
    } catch (error) {
      alert(error)
    }
  }

  const setSignal = (signal: keyof Signals, toggle: boolean) => {
    if (!has(signals, signal)) return
    signals[signal] = toggle
  }

  const initKeepAlivePages = () => {
    const pages = {}
    for (const pageRoute of routes) {
      if (get(pageRoute, 'meta.keepAlive')) {
        set(pages, pageRoute.name, { enabled: true })
      }
    }
    keepAlivePagesConfig.value = pages
  }

  const keepAlivePagesName = computed(() => {
    return map(keepAlivePagesConfig.value, (page, key) => {
      if (page.enabled) return key
    })
  })

  return {
    appLoading,
    getApiEndPoint,
    apiEndPoints,
    signals,
    setSignal,
    initKeepAlivePages,
    keepAlivePagesName,
  }
})
