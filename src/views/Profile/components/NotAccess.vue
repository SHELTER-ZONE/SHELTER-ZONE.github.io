<template>
  <div class="profile-not-access f-col-center">
    <div class="f-col-center gap-[10px]">
      <n-icon :size="40" color="var(--warning)"><AiResultsVeryHigh /></n-icon>
      <p class="text-warning text-lg font-medium">還差一點點 (๑•̀ㅂ•́)و✧ !!</p>
    </div>

    <div class="discord-message">
      <pre><code class="fix">Oops! 發現你尚有條件未達成，請依照下方指示完成步驟方可啟用個人避難所</code></pre>
    </div>

    <section class="f-col-center max-w-[600px] w-full gap-[30px]">
      <SHBlockArea
        :active="szJoined"
        status="complete"
        text="已完成"
        :icon-size="30"
      >
        <JoinServerWarning />
      </SHBlockArea>

      <SHBlockArea
        :active="szUserProfile"
        status="complete"
        text="已完成"
        :icon-size="30"
      >
        <RegisterProfileWarn />
      </SHBlockArea>
    </section>
  </div>
</template>

<script setup lang="ts">
import { AiResultsVeryHigh } from '@vicons/carbon'
import { SHBlockArea } from '@proladon/shelter-ui'
import { NIcon } from 'naive-ui'
import JoinServerWarning from './JoinServerWarning.vue'
import RegisterProfileWarn from './RegisterProfileWarn.vue'
import { useOauthStore } from '@/stores/oauth'
import { storeToRefs } from 'pinia'
const oauthStore = useOauthStore()
const { szJoined, szUserProfile } = storeToRefs(oauthStore)
</script>

<style scoped lang="postcss">
.profile-not-access {
  @apply gap-[20px];
}
</style>
