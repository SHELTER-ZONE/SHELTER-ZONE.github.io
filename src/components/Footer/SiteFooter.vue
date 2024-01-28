<template>
  <footer class="site-footer">
    <h2 class="footer-text">SHELTER ZONE @2018 - {{ nowYear }}</h2>
    <Divider vertical />
    <SocialLinks />
  </footer>
</template>

<script setup lang="ts">
import SocialLinks from './components/SocialLink.vue'
import Divider from '@/components/Divider/Divider.vue'
import dayjs from 'dayjs'
import { computed } from 'vue'

const nowYear = computed(() => dayjs().year())
</script>

<style scoped lang="postcss">
.site-footer {
  @apply flex items-center justify-center;
  @apply gap-[20px];
  @apply py-[40px];
}

.footer-text {
  @apply text-sub;
}
</style>
