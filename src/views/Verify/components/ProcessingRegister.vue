<template>
    <div class="processing-register">
        <StackInfo v-model:value="stack" />
    </div>    
</template>


<script setup lang="ts">
import StackInfo from '@/components/StackInfo/StackInfo.vue'
import { useStackInfo } from "@/use/useStackInfo";
// api
import { createSZUser } from '@/api/szUser'
import { createSZUserProfile } from '@/api/szUserProfile'
// types
import type { SZVerifyFormData } from '../types'

import { onMounted } from 'vue';


const props = defineProps<{
  formData: SZVerifyFormData
}>()
const emits = defineEmits(['error'])


const { stack, changeStackInfo, pushStackInfo } = useStackInfo()

const handleRegisterError = (type: string, error: unknown, stackId: string) => {
  console.log(error)
  changeStackInfo(stackId, 'error')
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
    state: 'processing'
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
    state: 'processing'
  })
  const [, userProfileError]: any = await createSZUserProfile({
    userId: data.id,
    name: data.name,
    country: data.country,
    from: data.from,
  })
  if (userProfileError)
    handleRegisterError('userProfileError', userProfileError, 'creating-sz-user-profile')
    changeStackInfo('creating-sz-user-profile', 'resolve')
}

onMounted(async() => {
await processRegister(props.formData)
})
</script>