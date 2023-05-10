<template>
  <div class="sz-verify-confirm">
    <header class="hint-title">
      <n-icon><WarningFilled /></n-icon>
      <p>SZ 認證</p>
    </header>

    <main class="hint-content">
      <SZBlockContainer>
        <section>
          <p>你尚未通過 SHELTER ZONE 驗證</p>
          <p>通過驗證後才可看到所有SZ的頻道與使用SZ相關應用</p>
          <p>是否進行驗證？</p>
        </section>

        <section class="flex gap-[10px] justify-center mt-[20px]">
          <router-link :to="{ name: 'home' }">
            <n-button ghost>下次再說</n-button>
          </router-link>
          <router-link :to="gotoPageLink">
            <n-button ghost type="primary"> 前往驗證 </n-button>
          </router-link>
        </section>
      </SZBlockContainer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useOauthStore } from '@/stores/oauth'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { WarningFilled } from '@vicons/carbon'
import { NButton, NIcon } from 'naive-ui'
import { computed } from 'vue'

const oauthStore = useOauthStore()

const gotoPageLink = computed(() => {
  if (!oauthStore.szJoined) return { name: 'sz-join-confirm' }
  return { name: 'verify-form' }
})
</script>

<style scoped lang="postcss">
.sz-verify-confirm {
  /* @apply h-100vh; */
  @apply viewPx pt-[150px];
  @apply flex flex-col gap-[30px];
  @apply justify-center items-center;
}

.hint-title {
  @apply flex items-center justify-center gap-[5px];
  @apply text-primary text-sectionTitle;
}

.hint-content {
  @apply text-center;
}
</style>
