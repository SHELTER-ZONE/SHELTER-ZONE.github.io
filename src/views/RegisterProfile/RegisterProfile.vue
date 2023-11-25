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

      <section
        v-if="curStage !== stages.length - 1"
        class="mb-[40px] flex justify-center"
      >
        <StepBar :cur-step="curStage" :steps="stages.length" />
      </section>

      <section>
        <KeepAlive>
          <component
            :is="stages[curStage]"
            v-model:form="formData"
            :formData="formData"
            @complete="onStageComplete"
            @previous="onPreviousStage"
          />
        </KeepAlive>
      </section>
    </SZBlockContainer>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { AirlineRapidBoard } from '@vicons/carbon'
import { NIcon, NDivider } from 'naive-ui'
import VerifyForm from './components/VerifyForm.vue'
import Important from './components/Important.vue'
import OTPVerify from './components/OTPVerify.vue'
import StepBar from '@/components/StepBar.vue'
import Registering from './components/Registering.vue'

const stages = ref([VerifyForm, Important, OTPVerify, Registering])
const curStage = ref(0)
const completePercentage = ref(0)

const stepPercentage = computed(() => 100 / Object.keys(stages).length)

const formData = reactive({
  name: null,
  joinReason: null,
  from: null,
  country: null,
})

const onStageComplete = async (stage: string): Promise<void> => {
  completePercentage.value += stepPercentage.value
  curStage.value += 1
}

const onPreviousStage = (): void => {
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
