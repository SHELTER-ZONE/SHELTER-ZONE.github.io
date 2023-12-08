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
import { onMounted } from 'vue'
import { useMessage } from 'naive-ui'

const navBarBlockList = ['RegisterProfile', 'discord callback']
const message = useMessage()

onMounted(() => {
  message.warning('網站目前正在建構中，諸多畫面與功能尚未完善，請多見諒', {
    duration: 0,
    closable: true,
  })
  message.info('目前可進行基本的註冊及登入', {
    duration: 0,
    closable: true,
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
