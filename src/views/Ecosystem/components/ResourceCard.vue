<template>
  <a
    class="resource-card"
    :href="data.link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <SZBlockContainer class="full !hover:text-primary">
      <div class="flex items-center gap-[20px]">
        <n-icon :size="24"><component :is="data.icon" /></n-icon>
        <div>
          <h3 class="name">{{ data.name }}</h3>
          <div class="description">{{ data.description }}</div>
        </div>
      </div>
    </SZBlockContainer>
  </a>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { NIcon } from 'naive-ui'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import type { Component } from 'vue'

interface ResourceCardProps {
  data: {
    name: string
    description: string
    icon?: Component
    link: string
  }
}
withDefaults(defineProps<ResourceCardProps>(), {
  data: () => ({
    name: '',
    description: '',
    link: '',
  }),
})
</script>

<style scoped lang="postcss">
.resource-card {
  @apply w-full;
}

.name {
  @apply text-normal;
  @apply font-medium;
  @apply mb-[5px];
}

.description {
  @apply text-sm;
}
</style>
