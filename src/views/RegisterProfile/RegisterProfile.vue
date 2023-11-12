<template>
  <main class="register-profile">
    <SZBlockContainer class="w-full max-w-[500px] m-auto">
      <div
        class="flex flex-col justify-center items-center gap-[20px] py-[20px]"
      >
        <n-icon size="50"><AirlineRapidBoard /></n-icon>
        <p class="topic-title">Shelter Verify</p>
      </div>

      <n-divider />

      <section class="mb-[40px] flex justify-center">
        <StepBar :cur-step="curStage" />
      </section>

      <KeepAlive>
        <component
          :is="stages[curStage]"
          v-model:form="formData"
          @complete="onStageComplete"
          @previous="onPreviousStage"
        />
      </KeepAlive>
    </SZBlockContainer>
  </main>
</template>

<script setup lang="ts">
import { ref, shallowReactive, computed, reactive, onMounted } from 'vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { AirlineRapidBoard } from '@vicons/carbon'
import { NIcon, NDivider, NProgress, NButton } from 'naive-ui'
import { RegisterSZUserProfile } from '@/api/szUserProfile'
import VerifyForm from './components/VerifyForm.vue'
import Important from './components/Important.vue'
import OTPVerify from './components/OTPVerify.vue'
import StepBar from '@/components/StepBar.vue'
import { useOauthStore } from '@/stores/oauth'
import { get } from 'lodash-es'

// const stages = shallowReactive({
//   VerifyForm,
//   Important,
//   OTPVerify,
// })
const { user } = useOauthStore()
const stages = ref([VerifyForm, Important, OTPVerify])
const curStage = ref(0)
const completePercentage = ref(0)
const stepPercentage = computed(() => 100 / Object.keys(stages).length)
const formData = reactive({
  name: null,
  joinReason: null,
  from: null,
  country: null,
})

const payloadData = computed(() => {
  return {
    userId: get(user, 'sz.id'),
    ...formData,
  }
})

const onStageComplete = (stage: string) => {
  if (stage === 'otp') {
    // register profile
    return
  }
  completePercentage.value += stepPercentage.value
  curStage.value += 1
}

const onPreviousStage = () => {
  curStage.value -= 1
}

const registerSZUserProfile = async () => {
  await RegisterSZUserProfile(payloadData.value)
}

onMounted(() => {
  completePercentage.value += stepPercentage.value / 2
})
</script>

<style scoped lang="postcss">
.register-profile {
  @apply p-[50px];
  @apply flex flex-col gap-[50px];
}
</style>
