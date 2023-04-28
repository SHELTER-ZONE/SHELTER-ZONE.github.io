<template>
  <div class="processing-register">
    <SZBlockContainer class="process-info-wrapper">
      <StackInfo v-model:value="stack" class="flex-1" />
      <section class="flex justify-center mt-[30px]" v-if="showCloseBtn">
        <n-button @click="emits('close')">返回表單</n-button>
      </section>
    </SZBlockContainer>

    <SZBlockContainer v-if="showCloseBtn">
      <!-- <Divider :size="1" /> -->
      <p class="text-center">Error</p>
      <section
        class="my-[30px] flex gap-[10px] items-center justify-center text-danger"
      >
        <n-icon color="var(--danger)"><CloseFilled /></n-icon>
        <p>{{ errorMsg }}</p>
      </section>

      <section class="flex justify-center">
        <n-button @click="emits('close')">回報錯誤</n-button>
      </section>
    </SZBlockContainer>
  </div>
</template>

<script setup lang="ts">
import StackInfo from '@/components/StackInfo/StackInfo.vue'
import Divider from '@/components/Divider/Divider.vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { useStackInfo } from '@/use/useStackInfo'
import { NButton, NIcon } from 'naive-ui'
import { CloseFilled } from '@vicons/carbon'
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
const errorMsg = ref<string>('')

const { stack, changeStackInfo, pushStackInfo } = useStackInfo()

const handleRegisterError = (type: string, error: unknown, stackId: string) => {
  console.log(error)
  changeStackInfo(stackId, 'error')
  errorMsg.value = error.message
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

const registerSZUser = async (data: SZVerifyFormData) => {
  pushStackInfo({ name: '建立 SZ 使用者', id: 'creating-sz-user' })
  const [, userError]: any = await createSZUser({
    userId: data.id,
    type: 'user',
  })
  if (userError) handleRegisterError('userError', userError, 'creating-sz-user')
  changeStackInfo('creating-sz-user', 'resolve')
}

const processRegister = async (data: SZVerifyFormData) => {
  await registerSZUser(data)

  pushStackInfo({
    name: '建立 SZ User Profile',
    id: 'creating-sz-user-profile',
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
