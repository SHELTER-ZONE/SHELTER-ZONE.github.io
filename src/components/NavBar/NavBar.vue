<template>
  <nav class="navbar">
    <SZBlockContainer>
      <div class="nav-wrapper">
        <n-scrollbar x-scrollable>
          <NavList />
        </n-scrollbar>

        <LanguageBtn />
        <UserOptions />
      </div>
    </SZBlockContainer>
  </nav>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { NScrollbar } from 'naive-ui'
import NavList from './components/NavList.vue'
import UserOptions from './components/UserOptions.vue'
import LanguageBtn from './components/LanguageBtn.vue'
</script>

<style scoped lang="postcss">
.navbar {
  @apply sticky top-0 left-0 right-0 z-10;
  @apply backdrop-blur-[5px];
  backdrop-filter: blur(5px);
}

.nav-wrapper {
  @apply flex justify-between items-center gap-[30px];
}

.nav-items-list {
  @apply flex gap-[10px];
}
</style>
