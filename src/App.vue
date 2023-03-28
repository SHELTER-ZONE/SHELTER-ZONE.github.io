<template>
  <Provider>
    <component :is="activeLayout" />
    <!-- <router-view /> -->
  </Provider>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, type Component } from 'vue'
import Provider from '@/components/Provider.vue'
import Default from '@/layouts/default.vue'
import HomeLayout from '@/layouts/home.vue'

import { useAppStore } from '@/stores/app'
import { useRoute } from 'vue-router'

const route = useRoute()
const appStore = useAppStore()
const layout = computed(() => route.meta.layout || 'default')
const activeLayout = computed(() => layouts[layout.value as string])

const layouts: Record<string, Component> = {
  default: Default,
  home: HomeLayout,
}

onBeforeMount(async () => {
  await appStore.getApiEndPoint()
})
</script>

<style scoped></style>
