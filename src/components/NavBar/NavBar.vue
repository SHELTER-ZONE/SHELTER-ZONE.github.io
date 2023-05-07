<template>
  <nav class="navbar">
    <NavbarMobile class="!tablet:(hidden)" />
    <NavbarDesktop class="!<tablet:(hidden)" />
  </nav>
</template>

<script setup lang="ts">
import NavbarDesktop from './components/NavbarDesktop.vue'
import NavbarMobile from './components/NavbarMobile.vue'
</script>

<style scoped lang="postcss">
.navbar {
  @apply fixed top-0 left-0 right-0 z-10;
}

.nav-wrapper {
  @apply flex justify-between items-center gap-[30px];
}
</style>
