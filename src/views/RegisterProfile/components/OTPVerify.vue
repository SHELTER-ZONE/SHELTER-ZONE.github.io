<template>
  <div class="otp-verify">
    <OTPInput :inputCount="8" @update="onCodeUpdate" />
    <p class="text-center">英文字動轉換大寫</p>
    <n-button :disabled="disabledBtn" secondary type="info">
      發送 OTP 驗證碼
    </n-button>

    <n-button secondary type="info" @click="$emit('previous')"> 返回 </n-button>
  </div>
</template>

<script setup lang="ts">
import OTPInput from '@/components/OTPInput.vue'
import { NButton } from 'naive-ui'
import { ref, computed, watch } from 'vue'
import { VerifyOTP } from '@/api/otp'

const otpCode = ref<string>('')

const disabledBtn = computed<boolean>(() => {
  if (!otpCode.value) return true
  if (otpCode.value.length < 8) return true
  return false
})

watch(otpCode, async () => {
  if (otpCode.value.length === 8) verifyOTP()
})

const verifyOTP = async () => {
  await VerifyOTP({ code: otpCode.value })
}

const onCodeUpdate = (code: string) => {
  otpCode.value = code
}
</script>

<style scoped lang="postcss">
.otp-verify {
  @apply flex flex-col justify-center;
}
</style>
