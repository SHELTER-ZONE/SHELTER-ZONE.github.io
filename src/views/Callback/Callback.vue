<template>
  <main class="callback full">
    <StageChecking class="min-w-[500px]" v-model:value="stages" />
  </main>
</template>

<script setup lang="ts">
import StageChecking from './components/StageChecking.vue'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOauthStore } from '@/stores/oauth'
import { find } from 'lodash-es'
import type { Stage, StageState } from './types'

const router = useRouter()
const route = useRoute()
const oauthStore = useOauthStore()

const emitError = (errorCode: string) => {
  setTimeout(() => {
    router.replace({
      name: 'error',
      query: {
        code: errorCode,
      },
    })
  }, 1000)
}

const curStage = ref<string>('discord-oauthing')

const stages = ref<Stage[]>([
  {
    name: 'Discord 驗證中',
    id: 'discord-oauthing',
    state: 'processing',
  },
  {
    name: '取得 Discord AccessToken',
    id: 'get-discord-accesstoken',
    state: 'idle',
  },
  {
    name: '取得 Discord 使用者',
    id: 'find-discord-user',
    state: 'idle',
  },
  {
    name: '取得 SZ 使用者',
    id: 'find-sz-user',
    state: 'idle',
  },
])

const handleStage = (id: string, state: StageState) => {
  const stage = find(stages.value, { id })
  if (!stage) return
  stage.state = state
}

onMounted(async () => {
  await router.isReady()
  // let code = location.href.split('/')[4].split('=')[1]
  // code = code.replace('#', '')
  // if (code.includes('access_denied') || code.includes('error_description')) {
  //   return router.replace('/')
  // }

  // code oauthing
  handleStage('discord-oauthing', 'processing')
  const code = route.query.code
  if (!code) {
    emitError('AUTH_ERROR_0')
    handleStage('discord-oauthing', 'error')
    return
  }
  handleStage('discord-oauthing', 'resolve')

  // get accessToken
  handleStage('get-discord-accesstoken', 'processing')
  await oauthStore.getDCAccessToken(code as string)
  if (!oauthStore.accessToken) {
    emitError('AUTH_ERROR_1')
    handleStage('get-discord-accesstoken', 'error')
    return
  }
  handleStage('get-discord-accesstoken', 'resolve')

  // find dcUser
  handleStage('find-discord-user', 'processing')
  await oauthStore.findUserMe()
  if (!oauthStore.user) {
    emitError('AUTH_ERROR_2')
    handleStage('find-discord-user', 'error')
    return
  }
  handleStage('find-discord-user', 'resolve')

  // find szUser
  handleStage('find-sz-user', 'processing')
  await oauthStore.findSZUser()
  handleStage('find-sz-user', 'resolve')

  // 無註冊 szUser -> 前往註冊驗證頁
  if (oauthStore.user.sz && oauthStore.user.sz.verified) {
    // router.replace({ name: 'home' })
    return
  }
  // router.replace({ name: 'verify' })
})
</script>

<style scoped lang="postcss">
.callback {
  @apply grid place-content-center;
}
</style>
