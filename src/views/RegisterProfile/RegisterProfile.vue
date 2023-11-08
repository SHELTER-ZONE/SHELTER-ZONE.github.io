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

      <section class="mb-[40px]">
        <n-progress
          type="line"
          :percentage="completePercentage"
          :show-indicator="false"
        />
      </section>

      <KeepAlive>
        <component
          :is="stages[curStage]"
          @complete="onStageComplete"
          @previous="onPreviousStage"
        />
      </KeepAlive>
    </SZBlockContainer>
  </main>
</template>

<script setup lang="ts">
import { ref, shallowReactive, computed, onMounted } from 'vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { AirlineRapidBoard } from '@vicons/carbon'
import { NIcon, NDivider, NProgress, NButton } from 'naive-ui'
import VerifyForm from './components/VerifyForm.vue'
import Important from './components/Important.vue'
import OTPVerify from './components/OTPVerify.vue'

const curStage = ref(0)

// const stages = shallowReactive({
//   VerifyForm,
//   Important,
//   OTPVerify,
// })

const stages = ref([VerifyForm, Important, OTPVerify])

const completePercentage = ref(0)
const stepPercentage = computed(() => 100 / Object.keys(stages).length)

const onStageComplete = (stage: string) => {
  completePercentage.value += stepPercentage.value
  curStage.value += 1
}

const onPreviousStage = () => {
  curStage.value -= 1
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
