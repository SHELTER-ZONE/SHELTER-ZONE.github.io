<template>
  <main class="register-profile">
    <SZBlockContainer>
      <div
        class="flex flex-col justify-center items-center gap-[20px] py-[40px]"
      >
        <n-icon size="50"><AirlineRapidBoard /></n-icon>
        <p class="topic-title">Shelter Verify</p>
      </div>
      <n-divider />
      <VerifyForm />
    </SZBlockContainer>
  </main>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { AirlineRapidBoard } from '@vicons/carbon'
import { NIcon, NDivider } from 'naive-ui'
import VerifyForm from './components/VerifyForm.vue'
</script>

<style scoped lang="postcss">
.register-profile {
  @apply pt-[100px] px-[50px];
  @apply flex flex-col gap-[50px];
}
</style>
