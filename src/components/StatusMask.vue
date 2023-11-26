<template>
  <div class="overlay">
    <div v-if="show" class="overlay-status abs-center f-col-center">
      <div class="f-row-center gap-[10px]">
        <n-icon
          v-if="status !== 'disabled'"
          :size="iconSize"
          :color="iconProps.color"
        >
          <component :is="iconProps.icon" />
        </n-icon>
        <p
          v-if="text"
          :style="`color: ${iconProps.color}; font-size: ${iconSize / 1.5}px`"
        >
          {{ text }}
        </p>
      </div>
    </div>
    <div :class="{ 'overlay-mask': show }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { CheckmarkFilled, ErrorFilled } from '@vicons/carbon'
import { computed } from 'vue'
import { get } from 'lodash-es'

export interface StatusMaskProps {
  status: string
  iconSize: number
  text?: string
  show?: boolean
}
const props = withDefaults(defineProps<StatusMaskProps>(), {
  status: 'disabled',
  iconSize: 24,
  show: true,
})

const statusConfig = {
  complete: { icon: CheckmarkFilled, color: 'var(--primary)' },
  error: { icon: ErrorFilled, color: 'var(--danger)' },
}

const iconProps = computed(() => {
  return {
    icon: get(statusConfig, `${props.status}.icon`),
    color: get(statusConfig, `${props.status}.color`),
  }
})
</script>

<style scoped lang="postcss">
.overlay {
  @apply relative select-none;
}
.overlay-mask {
  @apply opacity-30 pointer-events-none select-none;
}
</style>
