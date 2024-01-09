<template>
  <div class="otp-verify">
    <OTPInput :inputCount="8" :disabled="verifying" :error="otpError" v-model:value="otpCode" :onVerify="verifyOTP" />
    <p class="text-center text-sm">
      <n-icon>
        <CharacterPatterns />
      </n-icon>
      英文將自動轉換為大寫
    </p>

    <section class="flex flex-col gap-15px">
      <n-button :disabled="cooldown" :loading="verifying" secondary type="info" @click="generateOTP">
        <p>重新取得 OTP 驗證碼 <span v-if="cooldown">( <n-countdown :duration="30000" :on-finish="onCooldownFinish" /> )</span>
        </p>

      </n-button>
      <n-button text class="underline" @click="showHelpModal = !showHelpModal">沒有收到驗證碼?</n-button>
    </section>
  </div>
  <OTPHelpModal v-model:show="showHelpModal" @close="showHelpModal = false" />
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, type Ref } from 'vue'
import OTPInput from '@/components/OTPInput.vue'
import { NButton, NCountdown, NIcon, useMessage } from 'naive-ui'
import { VerifyOTP, GenerateOTP } from '@/api/otp'
import { useOauthStore } from '@/stores/oauth'
import { get } from 'lodash-es'
import { CharacterPatterns } from '@vicons/carbon'
import OTPHelpModal from './OTPHelpModal.vue'

const emits = defineEmits(['complete'])

const message = useMessage()
const showHelpModal = ref<boolean>(false)
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
  const dcUserId = get(user, 'sz.discordId')

  if (!dcUserId) {
    message.warning('查無使用者 user.sz.discordId')
    generating.value = false
    return
  }
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
  if (err) {
    window.$message.error(err.message)
    otpError.value = true
    otpCode.value.fill(null, 0)
    verifying.value = false
    await nextTick()
    inputRefs.value[0].focus()
    return
  }
  emits('complete', 'OTPVerify')
}

onMounted(async () => {
  generateOTP()
})
</script>

<style scoped lang="postcss">
.otp-verify {
  @apply flex flex-col justify-center gap-[30px];
}
</style>
