<template>
  <main class="profile">
    <SZBlockContainer class="w-full max-w-[1980px]">
      <div class="f-col-center gap-[20px] py-[40px]">
        <n-icon :size="50"><Campsite /></n-icon>
        <p class="topic-title">Personal Shelter</p>
        <n-divider class="bg-primary-bg" />

        <NotAccess v-if="!szUserProfile || !szJoined" />

        <div v-if="szUserProfile && szJoined">
          <BaseInfoBlock />
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

const { szJoined, szUserProfile } = useOauthStore()

onMounted(async () => {})
</script>

<style scoped lang="postcss">
.profile {
  @apply pt-[100px] px-[50px];
  @apply flex flex-col gap-[30px];
  @apply justify-center items-center;
}

.user-avatar {
  @apply w-[150px];
}

.profile-header {
  @apply flex gap-[30px];
}

.user-name {
  @apply text-lg text-primary;
}

.header-info {
  @apply flex flex-col justify-between;
  @apply text-normal;
}
</style>
