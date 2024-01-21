<template>
  <main class="explore">
    <PageTItle :icon="Explore" title="Explore" />
    <div class="page-wrapper">
      <UserSearch />
    </div>
  </main>
</template>

<script setup lang="ts">
import { Explore } from '@vicons/carbon'
import PageTItle from '@/components/PageTItle.vue'
import UserSearch from './components/UserSearch.vue'
</script>

<style scoped lang="postcss">
.explore {
  @apply viewPx viewPt viewMax;
}

.page-wrapper {
  @apply flex flex-col items-center w-full;
}
</style>
