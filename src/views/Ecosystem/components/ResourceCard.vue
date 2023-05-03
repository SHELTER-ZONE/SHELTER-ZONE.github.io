<template>
  <a
    class="resource-card"
    :href="data.link"
    target="_blank"
    rel="noopener noreferrer"
  >
    <SZBlockContainer class="full">
      <h3>{{ data.name }}</h3>
    </SZBlockContainer>
  </a>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'

interface ResourceCardProps {
  data: {
    name: string
    description: string
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
  @apply max-w-[400px] w-full;
}
</style>
