import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppStore = defineStore('app', () => {
  const apiEndPoints = ref({})

  async function getApiEndPoint() {
    try {
      const res = await axios({
        method: 'GET',
        url: 'https://raw.githubusercontent.com/SHELTER-ZONE/sz-microservices-endpoint/master/deta.json',
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
  return {
    getApiEndPoint,
    apiEndPoints,
  }
})
