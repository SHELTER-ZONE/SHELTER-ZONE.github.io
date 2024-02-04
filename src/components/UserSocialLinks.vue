<template>
  <div>
    <a
      v-for="item in displayData"
      :key="item.link"
      :href="item.link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <n-icon><component :is="item.icon" /></n-icon>
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

<style scoped lang="postcss"></style>
