<template>
  <main class="home">
    <Banner />
    <div class="page-wrapper">
      <Statistic class="section-max-w" />
      <SZIntro class="section-max-w" />
      <Topic class="section-max-w" />
      <TeamIntro class="section-max-w" />
    </div>
  </main>
</template>

<script setup lang="ts">
import Banner from './components/Banner.vue'
import TeamIntro from './components/TeamIntro/TeamIntro.vue'
import Statistic from './components/Statistic/Statistic.vue'
import SZIntro from './components/SZIntro.vue'
import Topic from './components/Topic/Topic.vue'
import { useSeoMeta } from 'unhead'


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

.section-max-w {
  @apply max-w-[800px] viewPx m-auto;
}
</style>
