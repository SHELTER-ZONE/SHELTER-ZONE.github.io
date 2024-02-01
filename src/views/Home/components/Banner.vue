<template>
  <header class="home-banner">
    <div class="sz-main-title">
      <div class="f-col-center gap-[7px]">
        <h1 class="sz-name">SHELTER ZONE</h1>
        <h2 class="sub-title">your hub of technology.</h2>
      </div>

      <a :href="_SZ_DC_INVITE_URL" target="_blank" rel="noopener noreferrer">
        <BaseButton secondary type="primary" class="join-btn">Join Discord</BaseButton>
      </a>

    </div>

    <div class="banner-mask" />
    <img :src="banner" alt="SHELTER ZONE" />

    <div class="banner-gradient" />
  </header>
</template>

<script setup lang="ts">
import banner from '@/assets/home/banner.jpg'
import BaseButton from '@/components/BaseButton.vue'
import { onMounted } from 'vue'
import { _SZ_DC_INVITE_URL } from '@/configs/urls'
import anime from 'animejs'


onMounted(() => {
  anime({
    targets: '.banner-mask',
    opacity: [1, 0],
    easing: 'easeOutElastic',
    duration: 7500,
    delay: 1500,
  })
  anime
    .timeline({
      easing: 'easeOutElastic',
      duration: 7500,
      delay: 1500,
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
  @apply w-full h-screen pointer-events-none;
  @apply object-cover opacity-50;
}

.sz-main-title {
  @apply absolute top-0 left-0 right-0 bottom-0 m-auto z-2;
  @apply text-center text-primary font-bold text-shadow-lg;
  @apply flex flex-col justify-center items-center;
  @apply text-3xl tracking-[10px] gap-[20px];
  @apply md:(text-4xl tracking-[20px] gap-[30px]);
  @apply tablet:(text-5xl tracking-[30px] gap-[40px]);

  backdrop-filter: blur(8px);
}

.sub-title {
  @apply text-sm leading-[12px] tracking-[0.3rem] font-medium;
  @apply md:(text-normal leading-[20px] tracking-[0.5rem]);
  @apply tablet:(text-[20px] leading-[30px] tracking-[0.6rem]);
}

.sz-main-title {
  /* @apply tracking-widest sm:tracking-[10px] md:tracking-[20px]; */
}

.join-btn {
  @apply text-normal rounded-0.5rem text-center tracking-[5px];
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
  background: linear-gradient(0deg,
      var(--primary-bg) 0%,
      rgba(0, 0, 0, 0) 100%);
}
</style>
