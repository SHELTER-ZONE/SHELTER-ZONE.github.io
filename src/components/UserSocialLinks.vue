<template>
  <div class="f-row gap-[20px]">
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
</template>

<script setup lang="ts">
import type { SocialLinkItem } from '@/api/szUserProfile'
import { get, map } from 'lodash-es'
import { NIcon } from 'naive-ui'

interface UserSocialLinksProps {
  socialLinks: SocialLinkItem[]
}

const props = defineProps<UserSocialLinksProps>()

const displayData = computed(() => {
  return map(props.socialLinks, (item: SocialLinkItem) => ({
    ...item,
    icon: get(socialLinkTypeIconConfigs, item.type),
  }))
})
</script>

<style scoped lang="postcss">
.social-link-item {
  @apply flex items-center gap-[5px] w-fit;
  @apply transition-all ease-in-out duration-300;
  @apply hover:(text-primary);
}
</style>
