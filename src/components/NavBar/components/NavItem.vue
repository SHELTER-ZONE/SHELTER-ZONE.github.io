<template>
  <RouterLink :to="{ name: route.name }">
    {{ get(route, 'meta.title') }}
  </RouterLink>
</template>

<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { RouterLink } from 'vue-router'
import { get } from 'lodash-es'
defineProps<{
  route: RouteRecordRaw
}>()
</script>

<style scoped lang="postcss"></style>
