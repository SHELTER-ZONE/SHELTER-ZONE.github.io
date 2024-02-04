<template>
  <div></div>
</template>

<script setup lang="ts">
import type { SocialLinkItem } from '@/api/szUserProfile'

interface UserSocialLinksProps {
  socialLinks: SocialLinkItem[]
}

const props = defineProps<UserSocialLinksProps>()
</script>

<style scoped lang="postcss"></style>
