<template>
  <div class="user-options">
    <LoginBtn v-if="!dcUser" />

    <NDropdown
      v-if="dcUser"
      trigger="click"
      :options="options"
      @select="onOptionSelect"
    >
      <n-button class="user-btn" quaternary>
        <template #icon v-if="!szUserProfile">
          <n-icon :size="24" color="var(--warning)"><WarningFilled /></n-icon>
        </template>
        <n-button type="primary" text>
          <div class="flex items-center gap-[10px]">
            <n-avatar :src="userAvatar" />
            <n-icon :size="18"><ChevronDown /></n-icon>
          </div>
        </n-button>
      </n-button>
    </NDropdown>
  </div>
</template>

<script setup lang="ts">
import LoginBtn from './LoginBtn.vue'
import { computed, h } from 'vue'
import { RouterLink } from 'vue-router'
import { NButton, NDropdown, NIcon, NAvatar } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'
import { ChevronDown, WarningFilled } from '@vicons/carbon'
import { get } from 'lodash-es'
import { useAppStore } from '@/stores/app'
import router from '@/router'

const emits = defineEmits(['close'])

const oauthStore = useOauthStore()
const { setSignal } = useAppStore()

const dcUser = computed(() => oauthStore.user.discord)
const userAvatar = computed(() => oauthStore.userAvatar)
const dcUserName = computed(() => get(dcUser.value, 'username'))
const szUserProfile = computed(() => get(oauthStore.user, 'sz.UserProfile'))

const logout = () => {
  setSignal('signoutConfirm', true)
}

const options = computed(() => {
  const options = [
    {
      label: '個人避難所',
      key: 'user-profile',
    },
    {
      label: '登出',
      key: 'logout',
    },
  ]
  return options
})

const onOptionSelect = (key: string) => {
  switch (key) {
    case 'user-profile':
      router.push({ name: 'profile' })
      break
    case 'logout':
      logout()
      break
  }
}
</script>

<style scoped lang="postcss">
.user-btn {
  @apply flex items-center gap-[10px];
}

.user-avatar {
  @apply h-[34px] rounded-md;
}
</style>
