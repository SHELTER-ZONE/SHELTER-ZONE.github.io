<template>
  <div class="user-social-links">
    <a
      v-for="item in displayData"
      :key="item.link"
      :href="item.link"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link-item"
    >
      <n-icon><component :is="item.icon" /></n-icon>
      <span>{{ item.name }}</span>
    </a>
  </div>

  <div v-if="!preview && !socialLinks.length" class="text-center">
    (社群/自訂連結) 尚未新增任何連結
  </div>
</template>

<script setup lang="ts">
import type { SocialLinkItem } from '@/api/szUserProfile'
import { get, map } from 'lodash-es'
import { NIcon } from 'naive-ui'

interface UserSocialLinksProps {
  socialLinks: SocialLinkItem[]
  preview?: boolean
}

const props = withDefaults(defineProps<UserSocialLinksProps>(), {
  socialLinks: () => [],
  preview: true,
})

const displayData = computed(() => {
  return map(props.socialLinks, (item: SocialLinkItem) => ({
    ...item,
    icon: get(socialLinkTypeIconConfigs, item.type),
  }))
})
</script>

<style scoped lang="postcss">
.user-social-links {
  @apply flex items-center flex-wrap gap-[20px];
  @apply <tablet:(justify-center);
}
.social-link-item {
  @apply flex items-center gap-[5px] w-fit;
  @apply transition-all ease-in-out duration-300;
  @apply hover:(text-primary);
  @apply text-normal font-bold;
}
</style>
