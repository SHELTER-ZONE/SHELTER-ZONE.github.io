<template>
  <main class="home">
    <Banner />
    <div class="page-wrapper">
      <Statistic />
      <TeamIntro />
    </div>
  </main>
</template>

<script setup lang="ts">
import Banner from './components/Banner.vue'
import TeamIntro from './components/TeamIntro/TeamIntro.vue'
import Statistic from './components/Statistic/Statistic.vue'
</script>

<style lang="postcss" scoped>
.home {
  @apply pb-[100px];
}
.page-wrapper {
  @apply px-[30px] pt-[30px] tablet:(pt-[100px]);
  @apply flex flex-col gap-[100px];
  @apply max-w-[1400px] m-auto;
}
</style>
