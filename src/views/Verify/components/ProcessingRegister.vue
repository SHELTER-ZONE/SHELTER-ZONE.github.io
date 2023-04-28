<template>
  <div class="processing-register">
    <SZBlockContainer class="process-info-wrapper">
      <StackInfo v-model:value="stack" class="flex-1" />
      <div class="flex justify-center mt-[30px]" v-if="showCloseBtn">
        <n-button @click="emits('close')">返回表單</n-button>
      </div>
    </SZBlockContainer>

    <SZBlockContainer v-if="showCloseBtn"> cassc </SZBlockContainer>
  </div>
</template>

<script setup lang="ts">
import StackInfo from '@/components/StackInfo/StackInfo.vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { useStackInfo } from '@/use/useStackInfo'
import { NButton } from 'naive-ui'
// api
import { createSZUser } from '@/api/szUser'
import { createSZUserProfile } from '@/api/szUserProfile'
// types
import type { SZVerifyFormData, SZVerifyFormDataStruc } from '../types'

import { onMounted, ref } from 'vue'

const props = defineProps<{
  formData: SZVerifyFormDataStruc
}>()
const emits = defineEmits(['close'])

const showCloseBtn = ref(false)

const { stack, changeStackInfo, pushStackInfo } = useStackInfo()

const handleRegisterError = (type: string, error: unknown, stackId: string) => {
  console.log(error)
  changeStackInfo(stackId, 'error')
  setTimeout(() => {
    showCloseBtn.value = true
  }, 1000)
  if (type === 'userError') {
    throw new Error('User Error Occurred.')
  }
  if (type === 'userProfileError') {
    throw new Error('User Profile Error Occurred.')
  }
}

const processRegister = async (data: SZVerifyFormData) => {
  pushStackInfo({
    name: '建立 SZ 使用者',
    id: 'creating-sz-user',
    state: 'processing',
  })
  const [, userError]: any = await createSZUser({
    userId: data.id,
    type: 'user',
  })
  if (userError) handleRegisterError('userError', userError, 'creating-sz-user')
  changeStackInfo('creating-sz-user', 'resolve')

  pushStackInfo({
    name: '建立 SZ User Profile',
    id: 'creating-sz-user-profile',
    state: 'processing',
  })
  const [, userProfileError]: any = await createSZUserProfile({
    userId: data.id,
    name: data.name,
    country: data.country,
    from: data.from,
  })
  if (userProfileError)
    handleRegisterError(
      'userProfileError',
      userProfileError,
      'creating-sz-user-profile',
    )
  changeStackInfo('creating-sz-user-profile', 'resolve')
}

onMounted(async () => {
  const formData = props.formData as SZVerifyFormData
  await processRegister(formData)
  // give discord role
})
</script>

<style scoped lang="postcss">
.processing-register {
  @apply flex flex-col gap-[30px];
}
.process-info-wrapper {
  @apply min-h-[200px];
  @apply flex flex-col;
}
</style>
