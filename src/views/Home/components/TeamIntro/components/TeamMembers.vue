<template>
  <div class="team-members">
    <TeamMemberCard
      v-for="member in members"
      :key="member.name"
      :data="member"
    />
  </div>
</template>

<script setup lang="ts">
import TeamMemberCard from './TeamMemberCard.vue'
import { LogoGithub, LogoYoutube } from '@vicons/carbon'

const avatarUrl = (userId: string, avatarId: string): string => {
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png?size=1024`
}

const members = [
  {
    name: 'Proladon#7525',
    tags: ['fullStack'],
    color: '#55B0F2',
    links: [
      { name: 'github', icon: LogoGithub, link: 'https://github.com/Proladon' },
      {
        name: 'youtube',
        icon: LogoYoutube,
        link: 'https://www.youtube.com/@Proladon',
      },
    ],
    avatar: avatarUrl('149772971555160064', '7ab2f70347204922ec90612abc432b0a'),
  },
  {
    name: '星曌#4316',
    tags: ['backend'],
    color: '#63E2B7',
    links: [
      {
        name: 'github',
        icon: LogoGithub,
        link: 'https://github.com/Xzihnago',
      },
    ],
    avatar: avatarUrl('470034188326797320', '65a8f2c7d87c5ae5560f3f58babfdcbb'),
  },
  {
    name: 'Irvine#8850',
    tags: ['frontend', 'ops'],
    color: '#F2E355',
    links: [
      {
        name: 'github',
        icon: LogoGithub,
        link: 'https://github.com/irvine1231',
      },
    ],
    avatar: avatarUrl('175464140825952256', 'a9cfcb8608c084ebeed2ccae18d284dd'),
  },
  {
    name: 'Ariz#0288',
    tags: ['frontend'],
    color: '#F2E355',
    links: [
      {
        name: 'github',
        icon: LogoGithub,
        link: 'https://github.com/Lunari8546',
      },
    ],
    avatar: avatarUrl('443715689291841536', '60b8abb9612012a3760a66f8aa619699'),
  },
]
</script>

<style scoped lang="postcss">
.team-members {
  /* @apply grid gap-[40px]; */
  /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
  @apply flex flex-wrap gap-[20px];
  @apply justify-center;
  @apply tablet:(gap-[40px]);
}
</style>
