<template>
  <div class="stack-info-item">
    <span>{{ data.name }}</span>

    <Divider :size="1" class="flex-1 !self-center" />

    <n-spin v-if="state === 'processing'" :size="14" />

    <n-icon
      :color="get(stateColors, state)"
      v-if="state !== 'processing' && dynamicCmp"
    >
      <Component :is="dynamicCmp" :size="14" />
    </n-icon>
  </div>
</template>

<script setup lang="ts">
import type { StackInfoItemData } from '../types'
import { NSpin, NIcon } from 'naive-ui'
import Divider from '@/components/Divider/Divider.vue'
import { useStackInfo } from '@/use/useStackInfo'
import { get } from 'lodash-es'
import { computed } from 'vue'

const { stateIcons, stateColors } = useStackInfo()

const props = defineProps<{
  data: StackInfoItemData
}>()

const state = computed(() => get(props.data, 'state', ''))

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
