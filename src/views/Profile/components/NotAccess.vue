<template>
  <SZBlockContainer class="w-full">
    <div class="f-col-center gap-[20px] py-[40px]">
      <n-icon :size="50"><Campsite /></n-icon>
      <p class="topic-title">Personal Shelter</p>
      <n-divider class="bg-primary-bg" />

      <div class="f-col-center gap-[10px] mb-[20px]">
        <n-icon :size="30" color="var(--danger)"><Locked /></n-icon>
        <p class="text-danger text-lg font-bold">Access Denied</p>
      </div>

      <section class="f-col-center max-w-[600px] w-full gap-[10px]">
        <StatusMask
          :show="szJoined"
          status="complete"
          text="已完成"
          :icon-size="30"
        >
          <JoinServerWarning />
        </StatusMask>

        <n-divider />

        <StatusMask
          :show="szUserProfile"
          status="complete"
          text="已完成"
          :icon-size="30"
        >
          <RegisterProfileWarn />
        </StatusMask>
      </section>
    </div>
  </SZBlockContainer>
</template>

<script setup lang="ts">
import { Campsite, Locked, CheckmarkFilled } from '@vicons/carbon'
import { NIcon, NButton, NDivider } from 'naive-ui'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import JoinServerWarning from './JoinServerWarning.vue'
import RegisterProfileWarn from './RegisterProfileWarn.vue'
import { useOauthStore } from '@/stores/oauth'
import { get } from 'lodash-es'
import StatusMask from '@/components/StatusMask.vue'

const { szJoined, szUserProfile } = useOauthStore()
</script>

<style scoped lang="postcss"></style>
