<template>
  <header class="home-banner">
    <img :src="banner" alt="SHELTER ZONE" />
  </header>
</template>

<script setup lang="ts">
import banner from '@/assets/home/banner.jpg'
</script>

<style scoped lang="postcss">
.home-banner img {
  @apply w-full opacity-50;
}
</style>
