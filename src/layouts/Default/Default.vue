<template>
  <div id="default-layout">
    <AppHeadbar />

    <RouterView />
  </div>
</template>

<script setup lang="ts">
import AppHeadbar from '../components/AppHeadbar.vue'
</script>

<style lang="postcss" scoped>
#default-layout {
  @apply full bg-bg.primary text-text.base;
}
</style>
