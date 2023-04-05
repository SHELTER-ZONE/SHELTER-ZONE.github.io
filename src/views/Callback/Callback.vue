<template>
  <main class="callback full">
    <StackInfo v-model:value="stack" />
  </main>
</template>

<script setup lang="ts">
import StackInfo from '@/components/StackInfo/StackInfo.vue'
import { useStackInfo } from '@/use/useStackInfo'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'
import { get } from 'lodash-es'

const router = useRouter()
const route = useRoute()
const oauthStore = useOauthStore()
const { stack, changeStackInfo, pushStackInfo } = useStackInfo()

const isError = ref<boolean>(false)

const emitError = (errorCode: string) => {
  isError.value = true
  pushStackInfo({
    name: '頁面跳轉中',
    id: 'redirecting',
    state: 'processing',
  })

  setTimeout(() => {
    router.replace({
      name: 'error',
      query: {
        code: errorCode,
      },
    })
  }, 3000)
}
const verifyCode = (code: string) => {
  pushStackInfo({
    name: 'Discord auth code 驗證中',
    id: 'discord-oauthing',
    state: 'processing',
  })
  if (!code) {
    emitError('AUTH_ERROR_0')
    changeStackInfo('discord-oauthing', 'error')
    return
  }
  changeStackInfo('discord-oauthing', 'resolve')
}
const getDCAccessToken = async (code: string) => {
  if (isError.value) return
  pushStackInfo({
    name: '取得 Discord AccessToken',
    id: 'get-discord-accesstoken',
    state: 'processing',
  })
  await oauthStore.getDCAccessToken(code as string)
  if (!oauthStore.accessToken) {
    emitError('AUTH_ERROR_1')
    changeStackInfo('get-discord-accesstoken', 'error')
    return
  }
  changeStackInfo('get-discord-accesstoken', 'resolve')
}
const findDCUser = async () => {
  if (isError.value) return
  pushStackInfo({
    name: '取得 Discord 使用者',
    id: 'find-discord-user',
    state: 'processing',
  })
  await oauthStore.findUserMe()
  if (!oauthStore.user) {
    emitError('AUTH_ERROR_2')
    changeStackInfo('find-discord-user', 'error')
    return
  }
  changeStackInfo('find-discord-user', 'resolve')
}
const findSZUser = async () => {
  if (isError.value) return
  pushStackInfo({
    name: '取得 SZ 使用者',
    id: 'find-sz-user',
    state: 'processing',
  })
  await oauthStore.findSZUser()
  if (get(oauthStore.user, 'sz')) changeStackInfo('find-sz-user', 'resolve')
  else changeStackInfo('find-sz-user', 'warning')
}
const getDCUserGuilds = async () => {
  if (isError.value) return
  pushStackInfo({
    name: '取得使用者伺服器列表',
    id: 'get-user-guilds',
    state: 'processing',
  })
  await oauthStore.getDCUserGuilds()
  changeStackInfo('get-user-guilds', 'resolve')
}
const checkingSZUser = () => {
  if (isError.value) return
  if (get(oauthStore.user, 'sz') && get(oauthStore.user, 'sz.verified')) {
    pushStackInfo({
      name: `Welcome back - ${get(oauthStore.user, 'name')}`,
      id: 'sz-user-welcome',
      state: 'resolve',
    })
    router.replace({ name: 'home' })
    return
  }
  pushStackInfo({
    name: '未驗證 SZ 使用者',
    id: 'notfound-sz-user',
    state: '',
  })
  pushStackInfo({
    name: '前往認證確認頁面',
    id: 'redirect-to-sz-verify',
    state: 'processing',
  })
  // 無註冊 szUser -> 前往註冊驗證頁
  router.replace({ name: 'verify' })
}

onMounted(async () => {
  await router.isReady()
  // let code = location.href.split('/')[4].split('=')[1]
  // code = code.replace('#', '')
  // if (code.includes('access_denied') || code.includes('error_description')) {
  //   return router.replace('/')
  // }
  const code = route.query.code as string

  verifyCode(code)
  await getDCAccessToken(code)
  await findDCUser()
  await getDCUserGuilds()
  await findSZUser()
  checkingSZUser()
})
</script>

<style scoped lang="postcss">
.callback {
  @apply grid place-content-center;
}
</style>
