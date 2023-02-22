<template>
  <Provider>
    <component :is="layouts[layout]" />
    <!-- <router-view /> -->
  </Provider>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import Provider from './components/Provider.vue'
import Default from '@/layouts/Default.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { getApiEndPoint } = useAppStore()
const layout = computed(() => route.meta.layout || 'default')

const layouts = {
  default: Default,
}

onMounted(async () => {
  await getApiEndPoint()
})
</script>

<style scoped></style>
