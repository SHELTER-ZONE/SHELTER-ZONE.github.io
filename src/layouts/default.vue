<template>
  <main class="default-layout">
    <slot />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="postcss">
.default-layout {
  @apply bg-primary-bg;
}
</style>
