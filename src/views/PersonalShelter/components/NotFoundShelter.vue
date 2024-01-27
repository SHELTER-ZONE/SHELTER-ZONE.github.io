<template>
  <main class="not-found-shelter">
    <n-icon size="50"><Unknown /></n-icon>
    <h2>Oops, Not Found Shelter (x __ x) !!</h2>
  </main>
</template>

<script setup>
import { NIcon } from 'naive-ui'
import { Unknown } from '@vicons/carbon'
</script>

<style scoped lang="postcss">
.not-found-shelter {
  @apply text-warning text-normal;
  @apply flex flex-col justify-center items-center gap-[20px];
}
</style>
