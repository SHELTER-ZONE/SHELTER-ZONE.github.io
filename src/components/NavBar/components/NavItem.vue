<template>
  <RouterLink
    class="nav-item"
    :to="{ name: routeData.name }"
    @click="emits('change')"
  >
    <n-button
      text
      style="font-size: 18px"
      class="flex items-center"
      :class="{
        'active-route': isCurRoute,
        'text-gray-300': !isCurRoute,
      }"
    >
      <div class="f-row gap-[5px] font-medium items-center">
        <n-icon v-if="get(routeData, 'meta.icon')"
          ><component :is="get(routeData, 'meta.icon')"
        /></n-icon>
        <p>{{ get(routeData, 'meta.title') }}</p>
      </div>
    </n-button>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink, useRoute, type RouteRecordRaw } from 'vue-router'
import { NButton, NIcon } from 'naive-ui'
import { get } from 'lodash-es'
import { computed } from 'vue'

const props = defineProps<{
  routeData: RouteRecordRaw
}>()

const emits = defineEmits(['change'])

const route = useRoute()
const isCurRoute = computed(() => {
  const curRoute = route.name
  return props.routeData.name === curRoute
})
</script>

<style scoped lang="postcss">
.nav-item {
  @apply text-[20px];
  @apply font-medium;
}

.active-route {
  @apply text-primary;
}
</style>
