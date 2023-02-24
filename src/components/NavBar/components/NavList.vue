<template>
  <div class="nav-list">
    <NavItem v-for="route in displayRoutes" :key="route.name" :route="route" />
  </div>
</template>

<script setup lang="ts">
import NavItem from './NavItem.vue'
import { useRoutes } from '@/use/useRoutes'
const { displayRoutes } = useRoutes()
</script>

<style scoped lang="postcss">
.nav-list {
  @apply flex gap-[10px];
}
</style>
