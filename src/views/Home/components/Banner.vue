<template>
  <header class="home-banner">
    <div class="sz-main-title">
      <div class="f-col-center gap-[7px]">
        <h1 class="sz-name">SHELTER ZONE</h1>
        <h2 class="sub-title">a place your shelter</h2>
      </div>
      <n-button
        v-if="!dcUser"
        secondary
        type="primary"
        class="join-btn"
        @click="onSignin"
        :loading="loading"
      >
        加入成為避難者
      </n-button>
    </div>

    <div class="banner-mask" />
    <img :src="banner" alt="SHELTER ZONE" />

    <div class="banner-gradient" />
  </header>
</template>

<script setup lang="ts">
import banner from '@/assets/home/banner.jpg'
import { useOauthStore } from '@/stores/oauth'
import { NButton } from 'naive-ui'
import { onMounted } from 'vue'
import { ref } from 'vue'
import anime from 'animejs'
import { computed } from 'vue'

const oauthStore = useOauthStore()
const dcUser = computed(() => oauthStore.user.discord)
const loading = ref(false)

const onSignin = async () => {
  try {
    loading.value = true
    await oauthStore.signin()
  } catch (error) {
    loading.value = false
  }
}

onMounted(() => {
  anime({
    targets: '.banner-mask',
    opacity: [1, 0],
    easing: 'easeOutSine',
    duration: 8000,
    delay: 700,
  })
  anime
    .timeline({
      easing: 'easeInOutQuad',
      duration: 6000,
    })
    .add({ targets: '.sz-name', color: '#DEDEDE' }, 0)
    .add({ targets: '.sub-title', color: '#DEDEDE' }, 0)
})
</script>

<style scoped lang="postcss">
.home-banner {
  @apply relative select-none;
}

.home-banner img {
  @apply w-full h-screen  pointer-events-none;
  @apply object-cover opacity-50;
}

.sz-main-title {
  @apply absolute top-0 left-0 right-0 bottom-0;
  @apply m-auto;
  @apply z-2;
  @apply flex flex-col justify-center items-center gap-[20px] tablet:(gap-[40px]);
  @apply text-center text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-shadow-lg;
  @apply font-bold;

  backdrop-filter: blur(8px);
}

.sub-title {
  @apply text-md tracking-0.8rem md:text-lg;
}

.sz-main-title {
  @apply tracking-widest sm:tracking-[10px] md:tracking-[20px];
}

.join-btn {
  @apply text-normal rounded-0.5rem;
  @apply tablet:(text-lg p-2rem rounded-[1rem]);
  @apply overflow-hidden;
}

.banner-mask {
  @apply w-full h-full;
  @apply bg-[#111111];
  @apply absolute left-0 right-0 bottom-0 top-0 z-1;
}

.banner-gradient {
  @apply w-full h-[200px];
  @apply absolute left-0 right-0 bottom-0;
  background: linear-gradient(
    0deg,
    var(--primary-bg) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
