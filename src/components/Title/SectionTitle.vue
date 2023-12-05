<template>
  <div
    class="section-title"
    :class="{
      'text-left': position === 'left',
      'text-center': position === 'center',
      'text-right': position === 'right',
    }"
  >
    <h2 v-if="title" class="flex flex-col items-center">
      <slot name="prefix" />
      <n-icon v-if="iconSize" :size="iconSize">
        <slot name="icon" />
      </n-icon>
      <p>{{ title }}</p>
    </h2>
    <h2 v-else>
      <slot />
    </h2>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { NIcon } from 'naive-ui'

export interface props {
  title: string
  position?: 'left' | 'center' | 'right'
  iconSize?: number | string
}

withDefaults(defineProps<props>(), {
  position: 'center',
})
</script>

<style scoped lang="postcss">
.section-title {
  @apply text-sectionTitle;
  @apply font-bold;
  @apply mb-[20px];
  @apply tablet:(mb-[40px]);
}
</style>
