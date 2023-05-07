<template>
  <Provider class="bg-primary-bg">
    <div v-if="appStore.appLoading" class="loading-wrapper">
      <NSpin />
    </div>

    <component v-if="!appStore.appLoading" :is="activeLayout" />
    <!-- <router-view /> -->
  </Provider>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, type Component } from 'vue'
import { NSpin } from 'naive-ui'
import Provider from '@/components/Provider.vue'
import Default from '@/layouts/default.vue'

import { useAppStore } from '@/stores/app'
import { useRoute } from 'vue-router'
import { useOauthStore } from './stores/oauth'
import { checkExpiresIn, checkIsSZMember } from '@/router/guard'
import { useSZGuild } from './stores/szGuild'

const route = useRoute()
const appStore = useAppStore()
const oauthStore = useOauthStore()
const layout = computed(() => route.meta.layout || 'default')
const activeLayout = computed(() => layouts[layout.value as string])

const layouts: Record<string, Component> = {
  default: Default,
}

async function appInit() {
  console.log('app init')
  const appStore = useAppStore()
  const szGuildStore = useSZGuild()
  await appStore.getApiEndPoint()

  if (!oauthStore.loggedIn) oauthStore.clearUser()
  await Promise.all([
    oauthStore.findUserMe(),
    oauthStore.findSZUser(),
    szGuildStore.GetSZInfo(),
  ])
  appStore.appLoading = false
}

onBeforeMount(async () => {
  checkExpiresIn()
  appInit()
  checkIsSZMember()
})
</script>

<style scoped lang="postcss">
.loading-wrapper {
  @apply bg-primary-bg;
  @apply full flex items-center justify-center;
}
</style>
