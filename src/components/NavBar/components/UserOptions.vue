<template>
  <div class="user-options">
    <LoginBtn v-if="!dcUser" />

    <NDropdown v-if="dcUser" trigger="click">
      <NButton class="user-btn" type="primary" ghost>
        <template #icon>
          <img class="user-avatar" :src="userAvatar" alt="" srcset="" />
        </template>
        <div class="flex gap-[10px]">
          <p>{{ dcUserName }}</p>
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
import { get } from 'lodash-es'
const oauthStore = useOauthStore()

const dcUser = computed(() => oauthStore.user.discord)
const userAvatar = computed(() => oauthStore.userAvatar)
const dcUserName = computed(() => get(dcUser.value, 'username'))
</script>

<style scoped lang="postcss">
.user-btn {
  @apply flex gap-[5px];
}
</style>
