<template>
  <Provider>
    <component :is="layouts[layout]" />
  </Provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Provider from './components/Provider.vue'
import Default from '@/layouts/Default.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const layout = computed(() => route.meta.layout || 'default')

const layouts = {
  default: Default,
}
</script>

<style scoped></style>
