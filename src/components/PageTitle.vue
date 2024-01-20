<template>
  <header class="page-title">
    <n-icon :size="50">
      <component :is="icon" />
    </n-icon>
    <p class="topic-title">{{ title }}</p>
    <n-divider class="bg-primary-bg !m-0" />
  </header>
</template>

<script setup lang="ts">
import { NIcon, NDivider } from 'naive-ui'
import type { Component } from 'vue'

export interface PageTitleProps {
  title: string
  icon: Component
}

defineProps<PageTitleProps>()
</script>

<style scoped lang="postcss">
.page-title {
  @apply flex flex-col gap-[20px] items-center w-full pb-[20px];
}
</style>
