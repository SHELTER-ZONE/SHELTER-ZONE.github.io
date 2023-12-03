<template>
  <div class="info-item">
    <n-popover trigger="hover">
      <template #trigger>
        <div class="info-item-wrapper f-row">
          <slot name="icon">
            <n-icon v-if="data.icon" :color="data.iconColor"
              ><component :is="data.icon"
            /></n-icon>
          </slot>
          <slot name="value">
            <p>{{ data.value }}</p>
          </slot>
        </div>
      </template>
      <p v-if="data.tipInfo">{{ data.tipInfo }}</p>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { NIcon, NPopover } from 'naive-ui'

export interface InfoItemProps {
  data: {
    icon: Component | null
    iconColor?: string
    tipInfo?: string
    value: any
  }
}

defineProps<InfoItemProps>()
</script>

<style scoped lang="postcss">
.info-item {
  @apply select-none;
}
.info-item-wrapper {
  @apply gap-[7px] font-bold;
}
</style>
