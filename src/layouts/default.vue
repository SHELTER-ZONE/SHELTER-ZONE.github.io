<template>
  <main class="layout default">
    <div
      v-if="appStore.appLoading"
      class="full flex items-center justify-center"
    >
      <NSpin />
    </div>

    <template v-if="!appStore.appLoading">
      <NavBar />
      <router-view v-slot="{ Component }" class="flex-1">
        <transition
          @enter="pageEnter"
          @leave="pageLeave"
          :css="false"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
      <SiteFooter />
    </template>

    <RequestSigninModal />
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/NavBar.vue'
import SiteFooter from '@/components/Footer/SiteFooter.vue'
import RequestSigninModal from '@/components/Modal/RequestSigninModal.vue'
import { NSpin } from 'naive-ui'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { ref } from 'vue'
import anime from 'animejs'

const appStore = useAppStore()
const showModal = ref(false)

const pageEnter = (el: HTMLElement, done: CallableFunction) => {
  anime({
    targets: el,
    translateX: [400, 0],
    opacity: [0, 1],
    easing: 'easeInOutSine',
    complete: done,
  })
}

const pageLeave = (el, done) => {
  anime({
    targets: el,
    translateX: [0, -400],
    opacity: [1, 0],
    easing: 'easeInOutSine',
    complete: done,
  })
}
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
