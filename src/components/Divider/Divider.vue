<template>
  <div class="divider" :style="compactClass" />
</template>

<script setup lang="ts">
import { withDefaults, computed } from 'vue'

interface DividerProps {
  size?: string | number
  vertical?: boolean
  color?: string
}

const props = withDefaults(defineProps<DividerProps>(), {
  size: 1.5,
  vertical: false,
  color: `var(--base)`,
})

const dividerSize = computed(() => {
  if (props.vertical) return { width: `${props.size}px`, height: 'auto' }
  return { width: `auto`, height: `${props.size}px` }
})

const compactClass = computed(() => {
  const size = dividerSize.value
  const color = { backgroundColor: props.color }
  return {
    ...size,
    ...color,
  }
})
</script>

<style scoped lang="postcss">
.divider {
  @apply self-stretch;
}
</style>
