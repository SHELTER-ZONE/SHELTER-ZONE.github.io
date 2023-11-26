<template>
  <SZBlockContainer class="w-full">
    <div class="flex flex-col justify-center items-center gap-[20px] py-[40px]">
      <n-icon :size="50"><Campsite /></n-icon>
      <p class="topic-title">Personal Shelter</p>
      <n-divider class="bg-primary-bg" />

      <div class="flex flex-col items-center gap-[10px] mb-[20px]">
        <n-icon :size="30" color="var(--danger)"><Locked /></n-icon>
        <p class="text-danger text-lg font-bold">Access Denied</p>
      </div>

      <section class="max-w-[600px] w-full flex flex-col gap-[10px]">
        <JoinServerWarning />
        <n-divider />
        <RegisterProfileWarn v-if="!szUserProfile" />
      </section>
    </div>
  </SZBlockContainer>
</template>

<script setup lang="ts">
import { Campsite, Locked } from '@vicons/carbon'
import { NIcon, NButton, NDivider } from 'naive-ui'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import JoinServerWarning from './JoinServerWarning.vue'
import RegisterProfileWarn from './RegisterProfileWarn.vue'
import { useOauthStore } from '@/stores/oauth'
import { get } from 'lodash-es'

const { szJoined, szUserProfile } = useOauthStore()
</script>

<style scoped lang="postcss"></style>
