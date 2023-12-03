<template>
  <main class="sz-team">
    <!-- <StatusMask text="施工中" status="blocked" :iconSize="30"> -->
    <PageTitle>
      <div class="f-col-center gap-[10px]">
        <n-icon><Code /></n-icon>
        <p>{{ $route.meta.title }}</p>
      </div>
    </PageTitle>

    <section class="sz-team-intro">
      <div>
        SZ 開發團隊屬於貢獻性質，將負責開發 SZ 相關的服務、網站、Discord Bot
        這些服務將會被 SZ 內部所有人使用，而有些公開服務將會被全世界的人使用!
        想要自己開發的功能被很多人使用嗎，那麼歡迎你加入SZ 開發團隊!
      </div>
    </section>

    <div class="teams-list">
      <TeamBlock
        v-for="team in teams"
        :data="team"
        :key="team.name"
        :team="team.name"
        :techs="team.techs"
        :type="team.type"
      />
    </div>
    <!-- </StatusMask> -->
  </main>
</template>

<script setup lang="ts">
import TeamBlock from './components/TeamBlock.vue'
import PageTitle from '@/components/Title/PageTitle.vue'
import type { TeamData } from './types'
import StatusMask from '@/components/StatusMask.vue'
import AreaBlock from '@/components/AreaBlock.vue'
import { Code } from '@vicons/carbon'
import { NIcon } from 'naive-ui'

const teams: TeamData[] = [
  {
    name: '後端開發團隊',
    type: 'backend',
    description: '開發核心 API 服務',
    techs: [
      'vscode',
      'docker',
      'github',
      'vite',
      'express',
      'nodejs',
      'ts',
      'mongodb',
      'postman',
    ],
  },
  {
    name: '前端開發團隊',
    type: 'frontend',
    description: '官網維護、網頁應用開發',
    techs: [
      'vscode',
      'figma',
      'github',
      'vue',
      'vite',
      'js',
      'ts',
      'html',
      'css',
      'windicss',
      'postman',
    ],
  },
  {
    name: 'Discord Bot 開發團隊',
    type: 'bot',
    description: 'SZ 專用 Discord Bot 開發',
    techs: [
      'discord',
      'vscode',
      'docker',
      'github',
      'vite',
      'nodejs',
      'ts',
      'postman',
    ],
  },
]
</script>

<style scoped lang="postcss">
.sz-team {
  @apply viewPx pt-[150px];
  @apply flex flex-col items-center;
}

.sz-team-intro {
  @apply text-md mb-[40px] max-w-[640px] py-[40px];
}

.teams-list {
  @apply flex flex-col items-center gap-[20px];
  @apply tablet:(flex-wrap flex-row justify-center items-stretch);
}
</style>
