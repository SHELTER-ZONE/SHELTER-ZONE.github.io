<template>
  <header class="home-banner">
    <div class="sz-main-title">
      <h1>SHELTER ZONE</h1>
      <h2 class="sub-title">since 2018</h2>
    </div>
    <img :src="banner" alt="SHELTER ZONE" />

    <div class="banner-gradient" />
  </header>
</template>

<script setup lang="ts">
import banner from '@/assets/home/banner.jpg'
</script>

<style scoped lang="postcss">
.home-banner {
  @apply relative;
}

.home-banner img {
  @apply w-full h-screen;
  @apply object-cover opacity-50;
}

.sz-main-title {
  @apply absolute top-0 left-0 right-0 bottom-0;
  @apply m-auto;
  @apply z-1;
  @apply flex flex-col justify-center items-center gap-[20px];
  @apply text-center text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-shadow-lg;
  @apply font-bold;

  backdrop-filter: blur(8px);
}

.sub-title {
  @apply text-md md:text-xl;
}

.sz-main-title, sub-title {
  @apply tracking-widest sm:tracking-[10px] md:tracking-[20px];
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
