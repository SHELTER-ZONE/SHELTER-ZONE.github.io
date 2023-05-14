<template>
  <article class="topic">
    <header>
      <SectionTitle title="Topic" />
    </header>

    <main>
      <TopicTabs :tabs="topics" />
      <TopicIntro />
    </main>
  </article>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/Title/SectionTitle.vue'
import TopicTabs from './components/TopicTabs.vue'
import TopicIntro from './components/TopicIntro.vue'

const topics = [
  { label: 'Coding', value: 'Coding', icon: null },
  { label: '3D技術', value: '3D', icon: null },
  { label: '2D技術', value: '2D', icon: null },
]
</script>

<style scoped lang="postcss">
.topic {
  @apply max-w-[700px] m-auto;
}
.topic main {
  @apply flex flex-col gap-[30px];
  @apply items-center;
}
</style>
