<template>
  <main class="home">
    <Banner />
    <div class="page-wrapper"></div>
  </main>
</template>

<script setup lang="ts">
import Banner from './components/Banner.vue'
</script>

<style lang="postcss" scoped>
.home {
  @apply pb-[100px];
}

.page-wrapper {
  @apply pt-[30px] tablet:(pt-[100px]);
  @apply flex flex-col gap-[200px];
  @apply max-w-[1400px] m-auto;
  @apply <tablet:(gap-[140px]);
}
</style>
