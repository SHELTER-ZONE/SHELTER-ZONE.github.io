<template>
  <div class="stack-info-item">
    <span>{{ data.name }}</span>

    <n-spin v-if="data.state === 'processing'" size="small" />

    <n-icon v-if="data.state !== 'processing'">
      <Component :is="stateIcons[data.state]" />
    </n-icon>
  </div>
</template>

<script setup lang="ts">
import type { StackInfoItemData } from '../types'
import { NSpin, NIcon } from 'naive-ui'
import { useStackInfo } from '@/use/useStackInfo'

const { stateIcons } = useStackInfo()

defineProps<{
  data: StackInfoItemData
}>()
</script>

<style scoped lang="postcss">
.stack-info-item {
  @apply flex items-center gap-[20px];
  animation: mounted 0.5s ease-in-out;
}

@keyframes mounted {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 100;
  }
}
</style>
