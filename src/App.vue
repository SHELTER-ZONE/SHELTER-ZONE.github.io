<template>
  <Provider>
    <component :is="layouts[layout]" />
    <!-- <router-view /> -->
  </Provider>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import Provider from '@/components/Provider.vue'
import Default from '@/layouts/Default.vue'
import { useAppStore } from '@/stores/app'
import { useRoute } from 'vue-router'
import { NSpin } from 'naive-ui'

const route = useRoute()
const appStore = useAppStore()
const layout = computed(() => route.meta.layout || 'default')

const layouts = {
  default: Default,
}

onBeforeMount(async () => {
  await appStore.getApiEndPoint()
})
</script>

<style scoped></style>
