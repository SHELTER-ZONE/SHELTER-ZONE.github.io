<template>
  <div>
    <component :is="displayLayout" />
  </div>
</template>

<script setup lang="ts">
const displayLayout = computed(() => {
  const pageLayout = route.meta?.layout || routerLayouts.default
  return (layouts[pageLayout as keyof typeof layouts] as Component) || layouts.default
})
</script>

<style lang="postcss" scoped></style>
