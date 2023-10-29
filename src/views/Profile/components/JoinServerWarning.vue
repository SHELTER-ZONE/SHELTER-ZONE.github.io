<template>
  <ActionBlock title="尚未加入 SHELTER ZONE" actionName="Join Discord">
    <template #icon><Warning /></template>
    sacasccascsacscscsac
    <template #hint>
      <n-button text class="text-sm underline">
        我已經加入，點擊此處驗證
      </n-button>
    </template>
  </ActionBlock>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NAlert } from 'naive-ui'
import { Warning } from '@vicons/carbon'
import { SZInviteLink } from '@/configs/links'
import { useOauthStore } from '@/stores/oauth'
import AreaBlock from '@/components/AreaBlock.vue'
import ActionBlock from '@/components/ActionBlock.vue'

const { findMeGuilds, szJoined } = useOauthStore()
const loading = ref(false)

const joinDiscord = () => {
  window.open(SZInviteLink, '_blank')
}

const reCheck = async () => {
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
