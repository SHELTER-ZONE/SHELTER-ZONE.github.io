<template>
  <nav class="navbar">
    <div class="nav-wrapper">
      <n-scrollbar x-scrollable>
        <div class="flex gap-[25px]">
          <NavItem
            v-for="route in displayRoutes"
            :key="route.name"
            :routeData="route"
          />
        </div>
      </n-scrollbar>

      <LanguageBtn />
      <UserOptions />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { NScrollbar } from 'naive-ui'
import NavItem from './NavItem.vue'
import UserOptions from './UserOptions.vue'
import LanguageBtn from './LanguageBtn.vue'

import { useRoutes } from '@/use/useRoutes'
const { displayRoutes } = useRoutes()
</script>

<style scoped lang="postcss">
.navbar {
  @apply viewPx py-[20px] relative;
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
</style>
