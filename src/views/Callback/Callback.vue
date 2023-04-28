<template>
  <main class="callback full">
    <StackInfo v-model:value="stack" />
  </main>
</template>

<script setup lang="ts">
import StackInfo from '@/components/StackInfo/StackInfo.vue'
import { useStackInfo } from '@/use/useStackInfo'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from 'lodash-es'
import { useOauthStore } from '@/stores/oauth'
import { useAppStore } from '@/stores/app'

const router = useRouter()
const oauthStore = useOauthStore()
const appStore = useAppStore()
const { stack, changeStackInfo, pushStackInfo } = useStackInfo()

const isError = ref<boolean>(false)
const needVerify = ref<boolean>(false)
const redirectDelay: number = 3000

const emitError = (errorCode?: string | null, errorMsg?: unknown) => {
  isError.value = true
  pushStackInfo({ name: '頁面跳轉中', id: 'redirecting' })

  if (errorMsg) appStore.errorMsg = errorMsg

  setTimeout(() => {
    router.replace({
      name: 'error',
      query: {
        code: errorCode,
      },
    })
  }, redirectDelay)
}
const verifyCode = (code: string) => {
  pushStackInfo({ name: 'Discord oauth code 驗證', id: 'discord-oauthing' })
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
  })
  await oauthStore.getDCAccessToken(code)
  if (!oauthStore.accessToken) {
    emitError('AUTH_ERROR_1')
    changeStackInfo('get-discord-accesstoken', 'error')
    return
  }
  changeStackInfo('get-discord-accesstoken', 'resolve')
}
const findDCUser = async () => {
  if (isError.value) return
  pushStackInfo({ name: '查詢 Discord 使用者', id: 'find-discord-user' })
  try {
    const user = await oauthStore.findUserMe()
    if (user) changeStackInfo('find-discord-user', 'resolve')
    if (!user) {
      changeStackInfo('find-discord-user', 'warning')
      emitError('AUTH_ERROR_2')
    }
  } catch (error) {
    changeStackInfo('find-discord-user', 'error')
    emitError(null, error)
  }
}
const findSZUser = async () => {
  if (isError.value) return
  pushStackInfo({ name: '查詢 SZ 使用者', id: 'find-sz-user' })
  try {
    const user = await oauthStore.findSZUser()
    if (user) changeStackInfo('find-sz-user', 'resolve')
    if (!user) {
      changeStackInfo('find-sz-user', 'warning')
    }
  } catch (error) {
    changeStackInfo('find-sz-user', 'error')
    emitError(null, error)
  }
}
const getDCUserGuilds = async () => {
  if (isError.value) return
  pushStackInfo({ name: '取得使用者伺服器列表', id: 'get-user-guilds' })
  await oauthStore.getDCUserGuilds()
  changeStackInfo('get-user-guilds', 'resolve')
}

const checkingSZUser = () => {
  if (isError.value) return
  const szUser = get(oauthStore.user, 'sz')
  if (szUser) return
  pushStackInfo({
    name: '未驗證 SZ 使用者',
    id: 'notfound-sz-user',
    state: 'warning',
  })
  pushStackInfo({ name: '前往認證確認頁面', id: 'redirect-to-sz-verify' })
  needVerify.value = true
  setTimeout(() => {
    router.replace({ name: 'verify-confirm' })
  }, redirectDelay)
}

const szLogin = async () => {
  if (isError.value || needVerify.value) return
  pushStackInfo({ name: `SZ 使用者登入`, id: 'login-sz-user' })
  try {
    await oauthStore.loginSZUser()
    changeStackInfo('login-sz-user', 'resolve')
    const dcUser = get(oauthStore.user, 'discord')
    pushStackInfo({
      name: `Welcome back - ${get(dcUser, 'username')}`,
      id: 'user-welcome',
    })
    setTimeout(() => {
      router.replace({ name: 'home' })
    }, redirectDelay)
  } catch (error) {
    changeStackInfo('login-sz-user', 'error')
    emitError(null, error)
  }
}

onMounted(async () => {
  await router.isReady()
  let code = location.href.split('/')[3].split('=')[1]
  code = code.replace('#', '')

  verifyCode(code)
  await getDCAccessToken(code)
  await findDCUser()
  await getDCUserGuilds()
  await findSZUser()
  checkingSZUser()
  await szLogin()
})
</script>

<style scoped lang="postcss">
.callback {
  @apply grid place-content-center;
}
</style>
