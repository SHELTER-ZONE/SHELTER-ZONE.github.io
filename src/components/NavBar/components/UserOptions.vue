<template>
  <div class="user-options">
    <LoginBtn v-if="!user" />

    <NDropdown v-if="user" trigger="click">
      <NButton class="user-btn" type="primary" ghost>
        <template #icon>
          <img class="user-avatar" :src="userAvatar" alt="" srcset="" />
        </template>
        <div class="flex gap-[10px]">
          <p>{{ user.username }}</p>
          <NIcon><ChevronDown /></NIcon>
        </div>
      </NButton>
    </NDropdown>
  </div>
</template>

<script setup lang="ts">
import LoginBtn from './LoginBtn.vue'
import { computed } from 'vue'
import { NButton, NDropdown, NIcon } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'
import { ChevronDown } from '@vicons/carbon'
const oauthStore = useOauthStore()

const user = computed(() => oauthStore.user)
const userAvatar = computed(() => oauthStore.userAvatar)
</script>

<style scoped lang="postcss">
.user-btn {
  @apply flex gap-[5px];
}
</style>
