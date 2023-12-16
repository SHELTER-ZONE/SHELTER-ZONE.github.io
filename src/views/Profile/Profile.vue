<template>
  <main class="profile viewPx">
    <SZBlockContainer class="w-full max-w-[1980px]">
      <div class="f-col-center gap-[20px] py-[40px]">
        <n-icon :size="50"><Campsite /></n-icon>
        <p class="topic-title">Personal Shelter</p>
        <n-divider class="bg-primary-bg" />

        <NotAccess v-if="!szUserProfile || !szJoined" />

        <div v-if="szUserProfile && szJoined" class="wrapper">
          <BaseInfoBlock />
          <DailyCheckRecordBlock />
        </div>
      </div>
    </SZBlockContainer>
  </main>
</template>

<script setup lang="ts">
import { useOauthStore } from '@/stores/oauth'
import { onMounted } from 'vue'
import { NIcon, NDivider } from 'naive-ui'
import { Campsite } from '@vicons/carbon'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import NotAccess from './components/NotAccess.vue'
import BaseInfoBlock from './components/BaseInfoBlock.vue'
import DailyCheckRecordBlock from './components/DailyCheckRecordBlock.vue'

const { szJoined, szUserProfile } = useOauthStore()

onMounted(async () => {})
</script>

<style scoped lang="postcss">
.profile {
  @apply pt-[100px];
  @apply flex flex-col gap-[30px];
  @apply justify-center items-center;
}

.header-info {
  @apply flex flex-col justify-between;
  @apply text-normal;
}

.wrapper {
  @apply full flex flex-col justify-center items-center gap-[30px];
  @apply tablet:(flex-row items-start );
}
</style>
