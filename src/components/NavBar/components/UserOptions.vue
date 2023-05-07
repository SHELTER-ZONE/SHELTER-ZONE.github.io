<template>
  <div class="user-options">
    <LoginBtn v-if="!dcUser" />

    <NDropdown v-if="dcUser" trigger="hover" :options="options">
      <n-button class="user-btn" quaternary>
        <template #icon v-if="!szRegistered">
          <n-icon :size="18" color="var(--warning)"><WarningFilled /></n-icon>
        </template>
        <n-button type="primary" text>
          <template #icon>
            <img class="user-avatar" :src="userAvatar" alt="" srcset="" />
          </template>
          <div class="flex gap-[10px] text-md">
            <p>{{ dcUserName }}</p>
            <NIcon><ChevronDown /></NIcon>
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
import { NButton, NDropdown, NIcon } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'
import { ChevronDown, WarningFilled } from '@vicons/carbon'
import { get } from 'lodash-es'
import { useAppStore } from '@/stores/app'

const emits = defineEmits(['close'])

const oauthStore = useOauthStore()
const { setSignal } = useAppStore()

const dcUser = computed(() => oauthStore.user.discord)
const userAvatar = computed(() => oauthStore.userAvatar)
const dcUserName = computed(() => get(dcUser.value, 'username'))
const szRegistered = computed(() => oauthStore.szRegistered)

const logout = () => {
  setSignal('signoutConfirm', true)
}

const options = computed(() => {
  const options = []

  if (oauthStore.user.sz)
    options.push({
      key: 'profile',
      type: 'render',
      render: () =>
        h(RouterLink, { to: { name: 'profile' } }, () =>
          h(
            NButton,
            { quaternary: true, block: true, onClick: () => emits('close') },
            { default: () => '個人資料' },
          ),
        ),
    })

  if (!oauthStore.szRegistered)
    options.push({
      key: 'profile',
      type: 'render',
      render: () =>
        h(RouterLink, { to: { name: 'verify-confirm' } }, () =>
          h(
            NButton,
            {
              quaternary: true,
              block: true,
              type: 'warning',
              onClick: () => emits('close'),
            },
            { default: () => 'SZ 驗證' },
          ),
        ),
    })

  if (oauthStore.user.discord)
    options.push({
      label: '登出',
      key: 'logout',
      type: 'render',
      render: () =>
        h(
          NButton,
          {
            quaternary: true,
            block: true,
            onClick: () => {
              emits('close')
              logout()
            },
          },
          { default: () => '登出' },
        ),
    })

  return options
})
</script>

<style scoped lang="postcss">
.user-btn {
  @apply flex items-center gap-[5px];
}
</style>
