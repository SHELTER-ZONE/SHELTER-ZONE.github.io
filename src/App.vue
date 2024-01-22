<template>
  <Provider class="bg-primary-bg">
    <!-- <div v-if="appStore.appLoading" class="loading-wrapper">
      <NSpin />
    </div> -->
    <AppLoading v-if="appStore.appLoading" />

    <component v-if="!appStore.appLoading" :is="activeLayout" />
    <!-- <router-view /> -->
  </Provider>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, type Component } from 'vue'
import { NSpin } from 'naive-ui'
import Provider from '@/components/Provider.vue'
import Default from '@/layouts/default.vue'
import AppLoading from './components/AppLoading.vue'

import { useAppStore } from '@/stores/app'
import { useRoute } from 'vue-router'
import { useOauthStore } from './stores/oauth'
import { checkExpiresIn } from '@/router/guard'
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

  szGuildStore.getServerRoles({ throwErr: false })
  szGuildStore.getSZServerNews()
  szGuildStore.findDiscordServerConfig()

  if (!oauthStore.loggedIn) {
    oauthStore.clearUser()
  } else {
    try {
      await oauthStore.findMeDCUser()
      await oauthStore.findMeSZUser()
      Promise.all([
        oauthStore.findMeGuilds(),
        oauthStore.findMeDCMember({ throwErr: false }),
        // szGuildStore.findDiscordServerConfig(),
      ])

      // szGuildStore.getSZInfo()
      // szGuildStore.getAllSZChannel()
    } catch (error: any) {
      console.log('app init error', error)
      if (error.status === 401) oauthStore.logout()
    }
  }
  appStore.appLoading = false
}

onBeforeMount(async () => {
  // checkExpiresIn()
  appInit()
})
</script>

<style scoped lang="postcss">
.loading-wrapper {
  @apply bg-primary-bg;
  @apply full flex items-center justify-center;
}
</style>
