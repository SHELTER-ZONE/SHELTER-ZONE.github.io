<template>
  <main class="layout default">
    <NavBar v-if="!includes(navBarBlockList, $route.name)" />

    <div class="flex-1">
      <router-view v-slot="{ Component }">
        <!-- <transition
          @enter="pageEnter"
          @leave="pageLeave"
          :css="false"
          mode="out-in"
        > -->
        <component :is="Component" />
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

const navBarBlockList = ['RegisterProfile']
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
