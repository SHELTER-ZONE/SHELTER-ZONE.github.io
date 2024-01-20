<template>
  <div class="profile-not-access f-col-center">
    <div class="f-col-center gap-[10px] mb-[20px]">
      <n-icon :size="30" color="var(--danger)"><Locked /></n-icon>
      <p class="text-danger text-lg font-bold">Access Denied</p>
    </div>

    <section class="f-col-center max-w-[600px] w-full gap-[30px]">
      <StatusMask
        :show="szJoined"
        status="complete"
        text="已完成"
        :icon-size="30"
      >
        <JoinServerWarning />
      </StatusMask>

      <!-- <n-divider /> -->

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
</template>

<script setup lang="ts">
import { Locked } from '@vicons/carbon'
import { NIcon, NDivider } from 'naive-ui'
import JoinServerWarning from './JoinServerWarning.vue'
import RegisterProfileWarn from './RegisterProfileWarn.vue'
import { useOauthStore } from '@/stores/oauth'
import StatusMask from '@/components/StatusMask.vue'
import { storeToRefs } from 'pinia'
const oauthStore = useOauthStore()
const { szJoined, szUserProfile } = storeToRefs(oauthStore)
</script>

<style scoped lang="postcss">
.profile-not-access {
  @apply gap-[20px] py-[40px];
}
</style>
