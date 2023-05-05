<template>
  <RouterLink class="nav-item" :to="{ name: route.name }">
    <n-button quaternary type="primary">
      {{ get(route, 'meta.title') }}
    </n-button>
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { RouterLink } from 'vue-router'
import { NButton } from 'naive-ui'
import { get } from 'lodash-es'
defineProps<{
  route: RouteRecordRaw
}>()
</script>

<style scoped lang="postcss">
.nav-item {
  @apply text-shadow-xl;
}
</style>
