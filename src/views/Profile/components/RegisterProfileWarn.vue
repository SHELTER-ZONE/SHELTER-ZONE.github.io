<template>
  <ActionBlock
    title="避難者驗證"
    actionName="前往驗證"
    actionType="info"
    @action="goVerify"
  >
    <template #icon><FingerprintRecognition /></template>
    <div>
      <p>
        進行身分驗證將會創建 SZ 避難者身分資料，正式取得進入 SZ
        的通行證，才可看到所有伺服器中的頻道，且可使用 SZ 的相關服務與應用
      </p>
    </div>
  </ActionBlock>
</template>

<script setup>
import { ref } from 'vue'
import { NButton, NAlert } from 'naive-ui'
import { AirlineRapidBoard, FingerprintRecognition } from '@vicons/carbon'
import { SZInviteLink } from '@/configs/links'
import { useOauthStore } from '@/stores/oauth'
import AreaBlock from '@/components/AreaBlock.vue'
import ActionBlock from '@/components/ActionBlock.vue'
import { useRouter } from 'vue-router'

const { findMeGuilds, szJoined } = useOauthStore()
const router = useRouter()

const goVerify = () => {
  router.push({ name: 'RegisterProfile' })
}
</script>

<style lang="postcss" scoped>
.join-server-warning {
  @apply border-2 border-primary-bg p-[10px] rounded-sub;
}
</style>
