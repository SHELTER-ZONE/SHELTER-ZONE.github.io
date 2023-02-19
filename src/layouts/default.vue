<template>
  <main class="layout default">
    <NavBar />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar/NavBar.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="postcss">
.default {
  @apply relative bg-primary-bg;
}
</style>
