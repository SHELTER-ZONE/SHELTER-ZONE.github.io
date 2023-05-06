<template>
  <nav class="navbar">
    <div class="nav-wrapper">
      <n-scrollbar x-scrollable>
        <NavList />
      </n-scrollbar>

      <LanguageBtn />
      <UserOptions />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { NScrollbar } from 'naive-ui'
import NavList from './components/NavList.vue'
import UserOptions from './components/UserOptions.vue'
import LanguageBtn from './components/LanguageBtn.vue'
</script>

<style scoped lang="postcss">
.navbar {
  @apply viewPx py-[20px];
  @apply fixed top-0 left-0 right-0 z-10;
  @apply backdrop-blur-[5px];
  backdrop-filter: blur(5px);
  /* box-shadow: 10px 10px 40px 0px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 10px 10px 40px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 10px 10px 40px 0px rgba(0, 0, 0, 0.35); */
}

.nav-wrapper {
  @apply flex justify-between items-center gap-[30px];
}

.nav-items-list {
  @apply flex gap-[10px];
}
</style>
