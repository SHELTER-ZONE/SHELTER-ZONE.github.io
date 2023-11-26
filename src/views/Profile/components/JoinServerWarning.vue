<template>
  <ActionBlock
    title="加入 SHELTER ZONE Discord 伺服器"
    actionName="Join Discord"
    actionType="info"
    @action="joinDiscord"
  >
    <template #icon><LogoDiscord /></template>
    <div>
      <p class="pb-[10px]">
        請先加入 SHELTER ZONE Discord 伺服器，SZ 所有的服務都以 Discord
        為中心，所以請務必加入
      </p>
    </div>
    <template #hint>
      <n-button
        text
        class="text-sm underline"
        :loading="loading"
        @click="checkJoin"
      >
        我已經加入，點擊此處驗證
      </n-button>
    </template>
  </ActionBlock>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NAlert } from 'naive-ui'
import { LogoDiscord } from '@vicons/carbon'
import { SZInviteLink } from '@/configs/links'
import { useOauthStore } from '@/stores/oauth'
import AreaBlock from '@/components/AreaBlock.vue'
import ActionBlock from '@/components/ActionBlock.vue'

const { findMeGuilds, szJoined } = useOauthStore()
const loading = ref(false)

const joinDiscord = () => {
  window.open(SZInviteLink, '_blank')
}

const checkJoin = async () => {
  loading.value = true
  await findMeGuilds()
  loading.value = false
}
</script>

<style lang="postcss" scoped>
.join-server-warning {
  @apply border-2 border-primary-bg p-[10px] rounded-sub;
}
</style>
