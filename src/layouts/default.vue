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
        <router-view v-slot="{ Component }">
          <transition>
            <component :is="Component" />
          </transition>
        </router-view>
        <SiteFooter />
      </n-scrollbar>

      <!-- <RouterView v-if="!useScrollbar" /> -->
    </template>
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/NavBar.vue'
import SiteFooter from '@/components/Footer/SiteFooter.vue'
import { NSpin, NScrollbar } from 'naive-ui'
import { RouterView, useRoute } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { computed } from 'vue'

const appStore = useAppStore()
const route = useRoute()

const useScrollbar = computed(() => {
  return route.meta.nScrollbar
})
</script>

<style scoped lang="postcss">
.default {
  @apply relative bg-primary-bg;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
