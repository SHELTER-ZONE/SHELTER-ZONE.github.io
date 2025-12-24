<template>
  <SHButton class="base-button" :style="computedStyle" v-bind="$attrs">
    <template
      v-for="(slot, index) of Object.keys($slots)"
      :key="index"
      v-slot:[slot]
    >
      <slot :name="slot"></slot>
    </template>
  </SHButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SHButton } from '@proladon/shelter-ui'

export interface BaseButtonProps {
  border?: boolean
  borderColor?: string
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  border: false,
  borderColor: 'var(--base)',
})

const computedStyle = computed(() => {
  return {
    border: props.border ? `1px solid ${props.borderColor}` : undefined,
  }
})
</script>

<style scoped lang="postcss">
.base-button {
  @apply rounded-normal;
}
</style>
