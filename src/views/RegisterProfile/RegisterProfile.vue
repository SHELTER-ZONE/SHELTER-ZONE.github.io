<template>
  <main class="register-profile">
    <SZBlockContainer class="w-full max-w-[500px] flex-1 m-auto">
      <div
        class="flex flex-col justify-center items-center gap-[20px] py-[20px]"
      >
        <n-icon size="50">
          <AirlineRapidBoard />
        </n-icon>
        <p class="topic-title">Shelter Verify</p>
      </div>

      <n-divider />

      <section
        v-if="curStage < stages.length - 2"
        class="mb-[40px] flex justify-center"
      >
        <StepBar :cur-step="curStage" :steps="stages.length - 2" />
      </section>

      <section class="flex-1 grid">
        <!-- <KeepAlive> -->
        <component
          :is="stageCmps[curStage]"
          v-model:form="formData"
          :formData="formData"
          @complete="onStageComplete"
          @previous="onPreviousStage"
        />
        <!-- </KeepAlive> -->
      </section>
    </SZBlockContainer>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { AirlineRapidBoard } from '@vicons/carbon'
import { NIcon, NDivider } from 'naive-ui'
import StepBar from '@/components/StepBar.vue'
import VerifyForm from './components/VerifyForm.vue'
import { useOauthStore } from '@/stores/oauth'
import { storeToRefs } from 'pinia'
import { get } from 'lodash-es'

const oauthStore = useOauthStore()
const stages = [
  'VerifyForm',
  'Important',
  // 'OTPVerify',
  'Registering',
  'CompleteRegister',
]
const stageCmps = ref<any[]>([VerifyForm])
const curStage = ref<number>(0)
const { user } = storeToRefs(oauthStore)

const formData = reactive({
  name: null,
  joinReason: null,
  from: null,
  country: null,
})

const onStageComplete = async (stage: string): Promise<void> => {
  curStage.value += 1
}

const onPreviousStage = (): void => {
  curStage.value -= 1
}

onMounted(async () => {
  for (let cmpName of stages) {
    if (cmpName !== 'VerifyForm') {
      stageCmps.value.push(
        (await import(`./components/${cmpName}.vue`)).default,
      )
    }
  }
  formData.name =
    get(user.value, 'discord.global_name') ||
    get(user.value, 'discord.username') ||
    null
})
</script>

<style scoped lang="postcss">
.register-profile {
  @apply p-[50px] grid h-full;
  @apply gap-[50px];
}
</style>
