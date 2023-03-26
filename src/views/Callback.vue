<template>
  <main class="signin">
    <p class="w-full h-full text-center">{{ stage }}</p>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'

const router = useRouter()
const route = useRoute()
const oauthStore = useOauthStore()
const stage = ref('認證中...')

const emitError = (errorCode: string) => {
  router.replace({
    name: 'error',
    query: {
      code: errorCode,
    },
  })
}

onMounted(async () => {
  await router.isReady()
  // let code = location.href.split('/')[4].split('=')[1]
  // code = code.replace('#', '')
  // if (code.includes('access_denied') || code.includes('error_description')) {
  //   return router.replace('/')
  // }

  // callback
  stage.value = 'Discord 驗證中 ...'
  const code = route.query.code
  if (!code) {
    emitError('AUTH_ERROR_0')
    return
  }
  await oauthStore.getDCAccessToken(code as string)
  if (!oauthStore.accessToken) {
    emitError('AUTH_ERROR_1')
    return
  }

  // dcUser
  stage.value = '取得 Discord 使用者 ...'
  await oauthStore.findUserMe()
  if (!oauthStore.user) {
    emitError('AUTH_ERROR_2')
    return
  }

  // SZUser login
  stage.value = '取得 SZ 使用者 ...'
  await oauthStore.findSZUser()

  // 無註冊 szUser -> 前往註冊驗證頁
  if (oauthStore.user.sz && oauthStore.user.sz.verified) {
    router.replace({ name: 'home' })
    return
  }
  router.replace({ name: 'verify' })
})
</script>

<style scoped lang="postcss"></style>
