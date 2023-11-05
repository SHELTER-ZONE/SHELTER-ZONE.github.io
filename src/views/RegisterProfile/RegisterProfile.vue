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

      <n-progress type="line" :percentage="50" :show-indicator="false" />
      <VerifyForm />
      <n-button secondary type="primary">下一步</n-button>
    </SZBlockContainer>
  </main>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { AirlineRapidBoard } from '@vicons/carbon'
import { NIcon, NDivider, NProgress, NButton } from 'naive-ui'
import VerifyForm from './components/VerifyForm.vue'
import AreaBlock from '@/components/AreaBlock.vue'
</script>

<style scoped lang="postcss">
.register-profile {
  @apply p-[50px];
  @apply flex flex-col gap-[50px];
}
</style>
