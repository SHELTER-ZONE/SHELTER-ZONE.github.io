<template>
  <div class="profile">
    <img
      class="user-avatar"
      :src="`${userAvatar}?size=1024`"
      alt="discord user avatar"
    />
  </div>
</template>

<script setup lang="ts">
import { useOauthStore } from '@/stores/oauth'
import { computed } from 'vue'
const oauthStore = useOauthStore()
const userAvatar = computed(() => oauthStore.userAvatar)
</script>

<style scoped lang="postcss">
.profile {
  @apply pt-[100px];
  @apply flex flex-col;
  @apply justify-center items-center;
}

.user-avatar {
  @apply w-[150px];
}
</style>
