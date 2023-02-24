<template>
  <main class="signin"></main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'

const router = useRouter()
const route = useRoute()
const oauthStore = useOauthStore()
const stage = ref('認證中...')

onMounted(async () => {
  await router.isReady()
  // let code = location.href.split('/')[4].split('=')[1]
  // code = code.replace('#', '')
  // if (code.includes('access_denied') || code.includes('error_description')) {
  //   return router.replace('/')
  // }
  const code = route.query.code
  if (!code) return
  await oauthStore.getDCAccessToken(code as string)
  if (!oauthStore.accessToken) return
  stage.value = '取得使用者資訊...'
  await oauthStore.findUserMe()
  if (!oauthStore.user) return
  // router.replace('/important')

  // TODO SZUser login
  await oauthStore.findSZUser()

  // 無註冊 szUser -> 前往註冊頁
  // 已註冊 szUser -> 未認證 -> 前往註冊頁
})
</script>

<style scoped lang="postcss"></style>
