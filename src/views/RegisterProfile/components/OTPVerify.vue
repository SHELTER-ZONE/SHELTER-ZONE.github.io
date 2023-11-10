<template>
  <div class="otp-verify">
    <OTPInput
      :inputCount="8"
      :disabled="verifying"
      :error="otpError"
      v-model:value="otpCode"
      :onVerify="verifyOTP"
    />
    <p class="text-center text-sm">
      <n-icon><CharacterPatterns /></n-icon>
      英文將自動轉換為大寫
    </p>

    <section class="flex flex-col gap-15px">
      <n-button
        :disabled="cooldown"
        :loading="verifying"
        secondary
        type="info"
        @click="generateOTP"
      >
        <n-countdown
          v-if="cooldown"
          :duration="5000"
          :on-finish="onCooldownFinish"
        />
        <p v-show="!cooldown">發送 OTP 驗證碼</p>
      </n-button>
      <n-button text class="underline">沒有收到驗證碼?</n-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import OTPInput from '@/components/OTPInput.vue'
import { NButton, NCountdown, NIcon } from 'naive-ui'
import { ref, nextTick, type Ref } from 'vue'
import { VerifyOTP, GenerateOTP } from '@/api/otp'
import { useOauthStore } from '@/stores/oauth'
import { get } from 'lodash-es'
import { CharacterPatterns } from '@vicons/carbon'

const otpCode = ref<(string | null)[]>([])
const verifying = ref<boolean>(false)
const generating = ref<boolean>(false)
const cooldown = ref<boolean>(false)
const otpError = ref<boolean>(false)
const { user } = useOauthStore()

const onCooldownFinish = () => {
  cooldown.value = false
}

const generateOTP = async () => {
  if (generating.value || cooldown.value) return
  cooldown.value = true
  generating.value = true
  const dcUserId = get(user, 'discord.id')

  if (!dcUserId) return (generating.value = false)
  const [, err]: any = await GenerateOTP(dcUserId)
  generating.value = false
  if (err) {
    window.$message.error(err.message)
  }
}

const verifyOTP = async (inputRefs: Ref) => {
  if (verifying.value) return
  otpError.value = false
  verifying.value = true
  const [, err, rawErr]: any = await VerifyOTP({
    code: otpCode.value.join(''),
  })
  verifying.value = false
  if (err) {
    window.$message.error(err.message)
    otpError.value = true
    otpCode.value.fill(null, 0)
    await nextTick()
    inputRefs.value[0].focus()
  }
}
</script>

<style scoped lang="postcss">
.otp-verify {
  @apply flex flex-col justify-center gap-[30px];
}
</style>
