<template>
  <main class="callback full">
    <!-- <SZBlockContainer class="process-info-wrapper">
      <StackInfo v-model:value="stack" />
      <Loading />
    </SZBlockContainer> -->
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
        <p class="text-center py-[30px]">
          驗證 SZ 避難者信息中，請稍後片刻 uwu
        </p>
      </div>
      <n-spin :size="20" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import StackInfo from '@/components/StackInfo/StackInfo.vue'
import Loading from '@/components/Loading.vue'
import { useStackInfo } from '@/use/useStackInfo'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { get } from 'lodash-es'
import { useOauthStore } from '@/stores/oauth'
import { useAppStore } from '@/stores/app'
import { NSpin } from 'naive-ui'
import notifyMessage from '@/configs/notifyMessage'

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
  if (!code) {
    emitError('AUTH_ERROR_0')
    return
  }
}

const getDCUserGuilds = async () => {
  if (isError.value) return
  await oauthStore.findMeGuilds()
}

const checkingSZUser = async (code: string) => {
  if (isError.value) return
  await oauthStore.LoginSZUserByDiscord(code)
  const szUser = get(oauthStore.user, 'sz')
  if (!szUser) {
    emitError('AUTH_ERROR_3')
    return
  }
}

onMounted(async () => {
  await router.isReady()
  let code = location.href.split('/')[3].split('=')[1]
  code = code.replace('#', '')

  verifyCode(code)
  await checkingSZUser(code)
  getDCUserGuilds()
  if (!isError.value) {
    window.$message.success(notifyMessage.loginSuccess)
    router.push({ name: 'home' })
  }
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
