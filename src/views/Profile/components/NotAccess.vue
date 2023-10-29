<template>
  <SZBlockContainer class="w-full">
    <div class="flex flex-col justify-center items-center gap-[20px] py-[40px]">
      <n-icon :size="50"><Campsite /></n-icon>
      <p class="topic-title">Personal Shelter</p>
      <n-divider class="bg-primary-bg" />

      <div class="flex flex-col items-center gap-[10px]">
        <n-icon :size="30" color="var(--danger)"><Locked /></n-icon>
        <p class="text-danger text-md">Access Denied</p>
      </div>

      <section class="max-w-[500px] w-full">
        <JoinServerWarning />
      </section>
    </div>
  </SZBlockContainer>
</template>

<script setup>
import { Campsite, Locked, WarningFilled } from '@vicons/carbon'
import { NIcon, NButton, NDivider } from 'naive-ui'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import JoinServerWarning from './JoinServerWarning.vue'
</script>

<style scoped lang="postcss"></style>
