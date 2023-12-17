<template>
  <div class="team-members">
    <div class="member-list">
      <TeamMemberCard
        v-for="member in members"
        class="h-auto"
        :key="member.name"
        :data="member"
      />
    </div>

    <div class="f-row-center">
      <router-link :to="{ name: 'szteam' }">
        <n-button secondary type="info" class="text-lg p-1.5rem"
          >瞭解更多
        </n-button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import TeamMemberCard from './TeamMemberCard.vue'
import { LogoGithub, LogoYoutube } from '@vicons/carbon'
import { NButton } from 'naive-ui'
import { RouterLink } from 'vue-router'

const avatarUrl = (userId: string, avatarId: string): string => {
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.png?size=1024`
}

const members = [
  {
    name: 'Proladon',
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
    name: 'Irvine',
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
    name: '星曌',
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
    name: 'Ariz',
    tags: ['frontend'],
    color: '#F2E355',
    links: [
      {
        name: 'github',
        icon: LogoGithub,
        link: 'https://github.com/Lunari8546',
      },
    ],
    avatar: avatarUrl('443715689291841536', '6d5eff0633e13fd0cd9b212212cae3cc'),
  },
]
</script>

<style scoped lang="postcss">
.team-members {
  @apply flex flex-col gap-[40px];
}

.member-list {
  /* @apply grid gap-[40px]; */
  /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
  @apply grid gap-[20px] place-items-center items-stretch;
  @apply justify-center;
  @apply tablet:(gap-[40px]);
  grid-template-columns: repeat(2, 350px);
  @apply <tablet:(grid-cols-1);
}

@media screen and (max-width: 840px) {
  .member-list {
    @apply grid-cols-1;
  }
}
</style>
