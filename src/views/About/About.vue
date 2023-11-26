<template>
  <main class="about">
    <PageTitle />
    <StatusMask text="施工中" status="blocked" :iconSize="30">
      <History />
    </StatusMask>
  </main>
</template>

<script setup>
import PageTitle from '@/components/Title/PageTitle.vue'
import History from './components/History.vue'
import StatusMask from '@/components/StatusMask.vue'
</script>

<style scoped lang="postcss">
.about {
  @apply viewPx pt-[100px] tablet:(pt-[150px]);
  @apply flex flex-col items-center;
}
</style>
