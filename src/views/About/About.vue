<template>
  <main class="about">
    <PageTitle />
    <History />
  </main>
</template>

<script setup>
import PageTitle from '@/components/Title/PageTitle.vue'
import History from './components/History.vue'
</script>

<style scoped lang="postcss">
.about {
  @apply viewPx pt-[150px];
  @apply flex flex-col items-center;
}
</style>
