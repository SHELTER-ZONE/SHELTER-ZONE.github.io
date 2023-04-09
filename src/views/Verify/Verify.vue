<template>
  <div class="sz-verify">
    <SZVerifyConfirm v-if="!szJoined && !confirm" @confirm="confirm = true" />
    <SZVerifyForm v-if="confirm" @submit="onVerify" :verifying="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SZVerifyForm from './components/SZVerifyForm.vue'
import SZVerifyConfirm from './components/SZVerifyConfirm.vue'

import { useOauthStore } from '@/stores/oauth'
import { createSZUser } from '@/api/szUser'
import { createSZUserProfile } from '@/api/szUserProfile'
import type { SZVerifyFormData } from './types'

import { useAsyncState } from '@vueuse/core'
import { useMessage } from 'naive-ui'

const { success: successMsg, error: errorMsg } = useMessage()
const oauthStore = useOauthStore()
const confirm = ref<boolean>(false)
const szJoined = computed(() => oauthStore.szJoined)

const handleRegisterError = (type: string, error: unknown) => {
  console.log(error)
  if (type === 'userError') {
    throw new Error('User Error Occurred.')
  }
  if (type === 'userProfileError') {
    throw new Error('User Profile Error Occurred.')
  }
}

const registerSZUser = async (data: SZVerifyFormData) => {
  const [, userError]: any = await createSZUser({
    userId: data.id,
    type: 'user',
  })
  if (userError) handleRegisterError('userError', userError)
  const [, userProfileError]: any = await createSZUserProfile({
    userId: data.id,
    name: data.name,
    country: data.country,
    from: data.from,
  })
  if (userProfileError)
    handleRegisterError('userProfileError', userProfileError)
}

const { isLoading, execute, state } = useAsyncState(registerSZUser, null)

const onVerify = async (data: SZVerifyFormData) => {
  if (isLoading.value) return
  try {
    await execute(0, data)
    successMsg('認證成功!')
  } catch (error: any) {
    errorMsg(error)
  }
}
</script>

<style scoped lang="postcss">
.sz-verify {
  @apply pt-[100px];
  @apply flex justify-center;
}
</style>
