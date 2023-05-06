<template>
  <RouterLink class="nav-item" :to="{ name: routeData.name }">
    <n-button
      text
      style="font-size: 18px"
      :class="{
        'active-route': isCurRoute,
        'text-base': !isCurRoute,
      }"
    >
      {{ get(routeData, 'meta.title') }}
    </n-button>
  </RouterLink>
</template>

<script setup lang="ts">
import { useRoute, type RouteRecordRaw } from 'vue-router'
import { RouterLink } from 'vue-router'
import { NButton } from 'naive-ui'
import { get } from 'lodash-es'
import { computed } from 'vue'

const props = defineProps<{
  routeData: RouteRecordRaw
}>()

const route = useRoute()
const isCurRoute = computed(() => {
  const curRoute = route.name
  return props.routeData.name === curRoute
})
</script>

<style scoped lang="postcss">
.nav-item {
  @apply text-shadow-xl text-[20px];
  @apply font-medium;
}

.active-route {
  @apply text-primary;
}
</style>
