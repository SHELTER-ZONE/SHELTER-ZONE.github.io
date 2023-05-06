<template>
  <h1 class="page-title">
    <slot>{{ $route.meta.title }}</slot>
  </h1>
</template>

<script setup lang="ts"></script>

<style scoped lang="postcss">
.page-title {
  @apply text-center text-mPageTitle mb-[30px];
  @apply tablet:(text-pageTitle mb-[15px]);
}
</style>
