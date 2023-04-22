<template>
  <main class="home">
    <div class="page-wrapper">
      <Banner />
      <TeamIntro />
    </div>
  </main>
</template>

<script setup lang="ts">
import Banner from './components/Banner.vue'
import TeamIntro from './components/TeamIntro/TeamIntro.vue'
</script>

<style lang="postcss" scoped>
.page-wrapper {
  @apply pt-[100px];
  @apply max-w-[1200px] m-auto;
  @apply flex flex-col gap-[100px];
}
</style>
