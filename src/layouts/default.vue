<template>
  <main class="layout default">
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
import anime from 'animejs'
import type { AnimeInstance } from 'animejs'
import { onMounted } from 'vue'
import { useMessage } from 'naive-ui'

type AnimeCallbackFunction = (anim: AnimeInstance) => void

const pageEnter = (el: HTMLElement, done: AnimeCallbackFunction) => {
  anime({
    targets: el,
    translateX: [400, 0],
    opacity: [0, 1],
    easing: 'easeInOutSine',
    complete: (anim: AnimeInstance) => done && done(anim),
  })
}

const pageLeave = (el: HTMLElement, done: AnimeCallbackFunction) => {
  anime({
    targets: el,
    translateX: [0, -400],
    opacity: [1, 0],
    easing: 'easeInOutSine',
    complete: (anim: AnimeInstance) => done && done(anim),
  })
}

onMounted(() => {
  window.$message = useMessage()
  anime({
    targets: '.layout',
    opacity: [0, 1],
    easing: 'easeInOutSine',
    duration: 1500,
  })
})
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
