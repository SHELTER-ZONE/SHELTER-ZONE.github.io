<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-icon :size="size" :color="color"><Help /></n-icon>
    </template>
    <slot>{{ tip }}</slot>
  </n-tooltip>
</template>

<script setup lang="ts">
import { NTooltip, NIcon } from 'naive-ui'
import { Help } from '@vicons/carbon'

export interface TipProps {
  tip?: string
  size: number
  color: string
}

withDefaults(defineProps<TipProps>(), {
  size: 14,
  color: 'var(--primary)',
})
</script>

<style scoped lang="postcss"></style>
