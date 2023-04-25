<template>
  <section class="social-links">
    <a
      v-for="link in links"
      :key="link.name"
      :href="link.href"
      target="_blank"
      rel="noopener noreferrer"
      :title="link.name"
      class="social-link-item"
    >
      <n-icon :size="iconSize">
        <component :is="link.icon" />
      </n-icon>
    </a>
  </section>
</template>

<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { useSocialLinks } from '../composable/socialLinks'

const { links, iconSize } = useSocialLinks()
</script>

<style scoped lang="postcss">
.social-links {
  @apply flex items-center;
  @apply gap-[10px];
}

.social-link-item {
  @apply flex items-center;
}
</style>
