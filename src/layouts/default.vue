<template>
  <main class="layout default">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<style scoped lang="postcss">
.default {
  @apply bg-primary-bg;
}
</style>
