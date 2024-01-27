<template>
  <main class="not-found">
    <n-icon size="50" color="var(--warning)"><Unknown /></n-icon>
    <h1 class="hint-text">Oops, Not Found page (x __ x) !!</h1>

    <router-link :to="{ name: 'Home' }" @click="resetErrorPageData">
      <BaseButton class="w-full" secondary type="primary">
        <template #icon>
          <n-icon><Home /> </n-icon>
        </template>
        Go Home
      </BaseButton>
    </router-link>
  </main>
</template>

<script setup>
import { NIcon } from 'naive-ui'
import { Unknown, Home } from '@vicons/carbon'
import BaseButton from '@/components/BaseButton.vue'
</script>

<style scoped lang="postcss">
.not-found {
  @apply full flex flex-col justify-center items-center gap-[20px];
}

.hint-text {
  @apply text-warning text-lg;
}
</style>
