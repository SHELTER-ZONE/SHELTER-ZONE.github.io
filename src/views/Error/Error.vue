<template>
  <main class="error">
    <n-icon size="48"><Warning /></n-icon>
    <div>{{ errorMsg }}</div>
    <router-link :to="{ name: 'home' }">
      <n-button>Go Home</n-button>
    </router-link>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NIcon, NButton } from 'naive-ui'
import { Warning } from '@vicons/carbon'
import { useRoute } from 'vue-router'
import errors from '@/configs/errors'
import { get } from 'lodash-es'
import { useAppStore } from '@/stores/app'

const route = useRoute()
const appStore = useAppStore()

const errorCode = computed(() => route.query.code)
const errorMsg = computed(() => {
  const code = errorCode.value as string
  if (!code) {
    if (appStore.errorMsg) return appStore.errorMsg
    return ''
  }
  return get(errors, code)
})
</script>

<style scoped lang="postcss">
.error {
  @apply full flex flex-col justify-center items-center;
  @apply gap-[10px];
}
</style>
