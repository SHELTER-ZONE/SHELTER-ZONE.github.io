<template>
  <main class="layout default">
    <div
      v-if="appStore.appLoading"
      class="full flex items-center justify-center"
    >
      <NSpin />
    </div>
    <template v-if="!appStore.appLoading">
      <NavBar />
      <n-scrollbar>
        <RouterView class="overflow-y-auto" />
      </n-scrollbar>
    </template>
  </main>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar/NavBar.vue'
import { NSpin, NScrollbar } from 'naive-ui'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
</script>

<style scoped lang="postcss">
.default {
  @apply relative bg-primary-bg;
  @apply pt-[74px];
}
</style>
