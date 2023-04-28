<template>
  <div class="stack-info-item">
    <span>{{ data.name }}</span>

    <n-spin v-if="data.state === 'processing'" :size="14" />

    <n-icon v-if="data.state !== 'processing' && dynamicCmp">
      <Component :is="dynamicCmp" :size="14" />
    </n-icon>
  </div>
</template>

<script setup lang="ts">
import type { StackInfoItemData } from '../types'
import { NSpin, NIcon } from 'naive-ui'
import { useStackInfo } from '@/use/useStackInfo'
import { get } from 'lodash-es'
import { computed } from 'vue'

const { stateIcons } = useStackInfo()

const props = defineProps<{
  data: StackInfoItemData
}>()
const dynamicCmp = computed(() => {
  const state = props.data.state
  if (!state) return null
  return get(stateIcons, state)
})
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
