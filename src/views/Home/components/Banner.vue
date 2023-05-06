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
  @apply w-full opacity-50;
}

.sz-main-title {
  @apply absolute top-0 left-0 right-0 bottom-0;
  @apply m-auto;
  @apply z-1;
  @apply flex flex-col justify-center items-center gap-[15px];
  @apply text-center text-primary text-[50px] text-shadow-lg;
  @apply font-bold;
  @apply tracking-[20px];
  backdrop-filter: blur(5px);
}

.sub-title {
  @apply text-[20px];
  @apply tracking-[10px];
  box-shadow: 10px 10px 40px 0px rgba(0, 0, 0, 0.35);
  -webkit-box-shadow: 10px 10px 40px 0px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: 10px 10px 40px 0px rgba(0, 0, 0, 0.35);
}

.banner-gradient {
  @apply w-full h-[150px];
  @apply absolute left-0 right-0 bottom-0;
  background: linear-gradient(
    0deg,
    var(--primary-bg) 0%,
    rgba(0, 0, 0, 0) 100%
  );
}
</style>
