<template>
  <main class="callback full">
    <SZBlockContainer class="process-info-wrapper">
      <StackInfo v-model:value="stack" />
    </SZBlockContainer>
  </main>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
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
  console.log(code)
  pushStackInfo({ name: 'Discord oauth code 驗證', id: 'discord-oauthing' })
  if (!code) {
    emitError('AUTH_ERROR_0')
    changeStackInfo('discord-oauthing', 'error')
    return
  }
  changeStackInfo('discord-oauthing', 'resolve')
}

const getDCUserGuilds = async () => {
  if (isError.value) return
  pushStackInfo({ name: '取得使用者伺服器列表', id: 'get-user-guilds' })
  // await oauthStore.getDCUserGuilds()
  changeStackInfo('get-user-guilds', 'resolve')
}

const checkingSZUser = async (code: string) => {
  pushStackInfo({ name: `SZ 使用者登入`, id: 'login-sz-user' })
  if (isError.value) return
  await oauthStore.LoginSZUserByDiscord(code)
  const szUser = get(oauthStore.user, 'sz')
  if (szUser) {
    changeStackInfo('login-sz-user', 'resolve')
    pushStackInfo({
      name: `Welcome back - username`,
      id: 'user-welcome',
    })

    setTimeout(() => {
      router.push({ name: 'home' })
    }, 2000)
  }
  if (!szUser) {
    changeStackInfo('login-sz-user', 'error')
    emitError('AUTH_ERROR_3')
  }
}

onMounted(async () => {
  await router.isReady()
  let code = location.href.split('/')[3].split('=')[1]
  code = code.replace('#', '')

  verifyCode(code)
  await getDCUserGuilds()
  await checkingSZUser(code)
  // await szLogin()
})
</script>

<style scoped lang="postcss">
.callback {
  @apply viewPx full;
  @apply flex items-center justify-center;
  @apply max-w-[400px] m-auto;
}

.process-info-wrapper {
  @apply min-h-[300px];
  @apply w-full;
}
</style>
