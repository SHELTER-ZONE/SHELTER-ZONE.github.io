import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { _SZ_MICROSERVICES_TABLE } from '@/configs/urls'
import { has } from 'lodash-es'

interface Signals {
  requestSignin: boolean
  signoutConfirm: boolean
}

export const useAppStore = defineStore('app', () => {
  const appLoading = ref<boolean>(true)
  const apiEndPoints = ref({})
  const signals = reactive<Signals>({
    requestSignin: false,
    signoutConfirm: false,
  })

  async function getApiEndPoint() {
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

  function setSignal(signal: keyof Signals, toggle: boolean) {
    if (!has(signals, signal)) return
    signals[signal] = toggle
  }

  return {
    appLoading,
    getApiEndPoint,
    apiEndPoints,
    signals,
    setSignal,
  }
})
