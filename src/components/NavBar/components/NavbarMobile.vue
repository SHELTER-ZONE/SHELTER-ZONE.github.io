<template>
  <div
    class="navbar-mobile"
    :style="toggle ? ` backdrop-filter: blur(5px);` : ''"
  >
    <div
      :class="{
        'fade-in': toggle,
        'fade-out': !toggle,
      }"
      class="navbar-mobile-mask"
    />
    <section class="navbar-mobile-header">
      <!-- <router-link :to="{ name: 'Home' }">
        <h2 class="navbar-icon">SZ</h2>
      </router-link> -->
      <n-icon v-if="!toggle" size="30" @click="toggle = true"><Menu /></n-icon>
      <n-icon v-if="toggle" size="30" @click="toggle = false"><Close /></n-icon>
    </section>

    <NCollapseTransition :show="toggle">
      <div class="flex flex-col gap-[20px]">
        <Divider size="1" />

        <section>
          <div class="flex justify-between mb-[20px]">
            <LanguageBtn />
            <UserOptions @close="toggle = false" />
          </div>
          <n-scrollbar>
            <div
              class="flex flex-col items-center justify-center gap-[25px] py-[5px]"
            >
              <NavItem
                v-for="route in displayRoutes"
                :key="route.name"
                :routeData="route"
                @change="toggle = false"
              />
            </div>
          </n-scrollbar>
        </section>
      </div>
    </NCollapseTransition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavItem from './NavItem.vue'
import Divider from '@/components/Divider/Divider.vue'
import UserOptions from './UserOptions.vue'
import LanguageBtn from './LanguageBtn.vue'
import { NIcon, NScrollbar, NCollapseTransition } from 'naive-ui'
import { Menu, Close } from '@vicons/carbon'
import { useRoutes } from '@/use/useRoutes'
import { RouterLink } from 'vue-router'
const { displayRoutes } = useRoutes()

const toggle = ref(false)
</script>

<style scoped lang="postcss">
.navbar-mobile {
  @apply viewPx py-[20px] pb-[40px];
  @apply backdrop-blur-[5px] relative;
  @apply flex flex-col gap-[20px];
  /* backdrop-filter: blur(5px); */
}

.navbar-mobile-mask {
  @apply absolute top-0 right-0 left-0 bottom-0;
  @apply opacity-80;
}

.navbar-mobile-header {
  @apply flex justify-between items-center flex-row-reverse;
  @apply text-primary text-md;
}

.fade-in {
  @apply bg-secondary-bg;
  animation: fadeIn 0.5s ease-in-out;
  box-shadow: 10px 10px 29px 5px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 10px 10px 29px 5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 10px 10px 29px 5px rgba(0, 0, 0, 0.1);
}
.fade-out {
  animation: fadeOut 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    @apply opacity-0;
  }
  to {
    @apply opacity-70;
  }
}

@keyframes fadeOut {
  from {
    @apply opacity-70 bg-secondary-bg;
  }
  to {
    @apply opacity-0;
  }
}
</style>
