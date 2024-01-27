<template>
  <main id="layout" class="layout default">
    <NavBar v-if="!includes(navBarBlockList, $route.name)" />

    <div class="flex-1">
      <router-view v-slot="{ Component }">
        <!-- <transition
          @enter="pageEnter"
          @leave="pageLeave"
          :css="false"
          mode="out-in"
          > -->
        <keep-alive :include="(keepAlivePagesName as string[])">
          <component :is="Component" />
        </keep-alive>
        <!-- </transition> -->
      </router-view>
    </div>

    <SiteFooter />

    <RequestSigninModal />
    <SignoutModal />
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/NavBar.vue'
import SiteFooter from '@/components/Footer/SiteFooter.vue'
import RequestSigninModal from '@/components/Modal/RequestSigninModal.vue'
import SignoutModal from '@/components/Modal/SignoutModal.vue'
import { RouterView } from 'vue-router'
import { includes } from 'lodash-es'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const navBarBlockList = ['RegisterProfile', 'discord callback']
const appStore = useAppStore()
const { keepAlivePagesName } = storeToRefs(appStore)
</script>

<style scoped lang="postcss">
.default {
  @apply relative bg-primary-bg;
  @apply flex flex-col;
  @apply overflow-x-hidden overflow-y-auto;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
