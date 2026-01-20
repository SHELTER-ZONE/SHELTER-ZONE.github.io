<template>
  <main class="callback full">
    <div class="flex flex-col">
      <img class="rounded-[7px]" src="@/assets/user_login.gif" />
      <div class="flex items-center justify-center gap-[5px]">
        <p class="text-center py-[30px]">{{ statusMessage }}，請稍後片刻 uwu</p>
      </div>
      <SHSpin :size="20" />
    </div>
  </main>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { SHSpin, useNotification } from '@proladon/shelter-ui'
import { get } from 'lodash-es'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const notification = useNotification()
const { errorPageData } = useErrorPage()

const statusMessage = ref('')

const emitError = (errorData: {
  code?: string
  message?: string
  function: string
  [propName: string]: any
}) => {
  errorPageData.value = errorData
  errorPageData.value.timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss')
  router.replace({ name: 'Error', query: { errorType: 'User Login Faild' } })
}

const verifyCode = (): string => {
  statusMessage.value = '驗證登入交換碼'
  const code = get(route.query, 'code')
  // let code = location.href.split('/')[3].split('=')[1]
  // code = code.replace('#', '')
  if (!code) throw new Error('ascascs')
  return code as string
}

const userLogin = async (code: string) => {
  statusMessage.value = '驗證避難者信息中'
  const redirectUrl = `${window.location.origin}/discord/callback`
  const [data, error] = await DiscordOauthLogin({ code, redirectUrl })
  if (error) {
    throw error
  }
  userStore.userToken = data.token
  userStore.user = data.user
}

const handleLogin = async () => {
  try {
    const code = verifyCode()
    await userLogin(code)
    notification.success({
      message: notifyMessage.loginSuccess,
    })
    router.push({ name: 'Profile' })
  } catch (error) {
    console.log(error)
    const errorCode = get(error, 'data.code')
    const errorStatus = get(error, 'data.status')
    const errorMessage = get(error, 'data.message')
    emitError({
      status: errorStatus,
      code: errorCode,
      message: errorMessage,
      function: 'handleLogin',
      requestUrl: `${get(error, 'config.method')} | ${get(error, 'config.url')}`,
      headers: get(error, 'config.headers'),
      payload: get(error, 'config.data'),
      page: route.fullPath,
    })
  }
}

onMounted(async () => {
  await router.isReady()

  handleLogin()
})
</script>

<style scoped lang="postcss">
.callback {
  @apply flex items-center justify-center;
  @apply max-w-[400px] m-auto;
}

.process-info-wrapper {
  @apply min-h-[300px];
  @apply w-full;
}
</style>
