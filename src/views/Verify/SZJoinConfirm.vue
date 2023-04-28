<template>
  <main class="sz-join-confirm">
    <SZBlockContainer class="flex flex-col items-center gap-[30px]">
      <div class="flex justify-center">
        <n-icon :size="24"><Warning /></n-icon>
      </div>

      <section class="text-center">
        <p>你尚未加入 SHELTER ZONE Discord</p>
        <p>請先加入 Discord 以繼續進行驗證</p>
      </section>

      <section class="flex flex-col gap-[10px] justify-center">
        <a :href="_SZ_DC_INVITE_URL" target="_blank" rel="noopener noreferrer">
          <n-button secondary strong block type="info">
            Join Discord Server
          </n-button>
        </a>
        <router-link :to="{ name: 'home' }">
          <n-button ghost block>下次再說</n-button>
        </router-link>

        <n-button
          ghost
          block
          type="primary"
          :loading="checking"
          @click="onConfirm"
        >
          {{ checking ? '驗證中...' : '我已加入' }}
        </n-button>
      </section>
    </SZBlockContainer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NIcon, useMessage } from 'naive-ui'
import { Warning } from '@vicons/carbon'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { useOauthStore } from '@/stores/oauth'
import { _SZ_DC_INVITE_URL } from '@/configs/urls'
import { useRouter } from 'vue-router'

const oauthStore = useOauthStore()
const message = useMessage()
const router = useRouter()
const checking = ref<boolean>(false)

const onConfirm = async () => {
  if (checking.value) return
  checking.value = true
  await oauthStore.getDCUserGuilds({ showErrorMsg: true })
  if (!oauthStore.szJoined) {
    message.warning('未在 Discord 中查詢到成員，請確保已加入伺服器再試！')
  }
  if (oauthStore.szJoined) {
    router.push({ name: 'verify-form' })
  }
  checking.value = false
}
</script>

<style scoped lang="postcss">
.sz-join-confirm {
  @apply viewPx;
  @apply flex flex-col gap-[30px];
  @apply justify-center items-center;
}
</style>
