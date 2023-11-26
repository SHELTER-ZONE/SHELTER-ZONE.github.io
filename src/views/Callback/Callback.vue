<template>
  <main class="callback full">
    <div class="flex flex-col">
      <img
        class="rounded-[7px]"
        src="https://i.pinimg.com/originals/0b/5c/c0/0b5cc024841accd9a31a7b2daeb0e57b.gif"
      />
      <!-- <img
        class="rounded-[7px]"
        src="https://i.pinimg.com/originals/49/1e/cf/491ecfcebd2192e29b758ca798717ec6.gif"
      /> -->
      <div class="flex items-center justify-center gap-[5px]">
        <p class="text-center py-[30px]">{{ statusMessage }}，請稍後片刻 uwu</p>
      </div>
      <n-spin :size="20" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { get } from 'lodash-es'
import { useOauthStore } from '@/stores/oauth'
import { NSpin, useNotification } from 'naive-ui'
import notifyMessage from '@/configs/notifyMessage'
import dayjs from 'dayjs'
import { useErrorPage } from '@/use/useErrorPage'

const router = useRouter()
const route = useRoute()
const oauthStore = useOauthStore()
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
  router.replace({ name: 'error', query: { errorType: 'User Login Faild' } })
}
const verifyCode = (): string => {
  statusMessage.value = '驗證登入交換碼'
  let code = location.href.split('/')[3].split('=')[1]
  code = code.replace('#', '')
  if (!code) throw new Error('ascascs')
  return code
}

const userLogin = async (code: string) => {
  statusMessage.value = '驗證避難者信息中'
  await oauthStore.LoginSZUserByDiscord(code)
}

const getUserDCGuilds = async () => {
  // statusMessage.value = '驗證避難者信息中'
  await oauthStore.findMeGuilds()
}

const handleLogin = async () => {
  try {
    const code = verifyCode()
    await userLogin(code)
    await getUserDCGuilds()
    notification.success({
      content: notifyMessage.loginSuccess,
    })

    router.push({ name: 'home' })
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
      requestUrl: `${get(error, 'config.method')} | ${get(
        error,
        'config.url',
      )}`,
      headers: get(error, 'config.headers'),
      payload: get(error, 'config.data'),
      page: route.fullPath,
      timestamp: dayjs().format('YYYY/MM/DD HH:mm:ss'),
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
  @apply viewPx full;
  @apply flex items-center justify-center;
  @apply max-w-[400px] m-auto;
}

.process-info-wrapper {
  @apply min-h-[300px];
  @apply w-full;
}
</style>
