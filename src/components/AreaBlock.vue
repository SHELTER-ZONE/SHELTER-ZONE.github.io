<template>
  <div class="area-block">
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.area-block {
  @apply border-2 border-primary-bg p-[10px] rounded-sub;
}
</style>
