<template>
  <div class="step-bar" :style="computedStyle">
    <div
      class="step-item"
      v-for="(step, index) in steps"
      :key="index"
      :class="{ done: step <= curStep }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface StepBarProps {
  gap: number
  steps: number
  curStep: number
  align: 'left' | 'center' | 'right'
}

const props = withDefaults(defineProps<StepBarProps>(), {
  gap: 10,
  steps: 3,
  curStep: 1,
  align: 'center',
})

const computedStyle = computed(() => {
  return {
    gap: `${props.gap}px`,
    justifyContent: props.align,
  }
})
</script>

<style scoped lang="postcss">
.step-bar {
  @apply flex w-full;
}
.step-item {
  @apply max-w-[100px] w-full h-[5px] bg-base rounded-full;
}

.done {
  @apply bg-primary;
}
</style>
