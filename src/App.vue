<template>
  <SHConfigProvider>
    <SHNotificationProvider>
      <component :is="displayLayout" />
    </SHNotificationProvider>
  </SHConfigProvider>
</template>

<script setup lang="ts">
import layouts from './layouts'
import { SHConfigProvider, SHNotificationProvider } from '@proladon/shelter-ui'

const route = useRoute()

const displayLayout = computed(() => {
  const pageLayout = route.meta?.layout || 'default'
  return (layouts[pageLayout as keyof typeof layouts] as Component) || layouts.default
})
</script>

<style lang="postcss" scoped></style>
