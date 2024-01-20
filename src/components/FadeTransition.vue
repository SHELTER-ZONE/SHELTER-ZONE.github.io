<template>
  <transition>
    <slot />
  </transition>
</template>

<style scoped lang="postcss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
