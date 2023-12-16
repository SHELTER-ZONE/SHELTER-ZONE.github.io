<template>
  <div class="loading-wrapper">
    <img class="rounded-[7px] max-w-[300px]" src="@/assets/user_login.gif" />
    <p class="text-center">請稍後片刻 uwu</p>
    <NSpin />

    <SiteFooter class="fixed bottom-0 left-0 right-0" />
  </div>
</template>

<script setup lang="ts">
import { NSpin } from 'naive-ui'
import SiteFooter from '@/components/Footer/SiteFooter.vue'
</script>

<style scoped lang="postcss">
.loading-wrapper {
  @apply bg-primary-bg;
  @apply full flex flex-col items-center justify-center gap-[30px];
}
</style>
