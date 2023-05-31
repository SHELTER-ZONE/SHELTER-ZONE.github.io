<template>
  <main class="sz-team">
    <PageTitle />

    <section class="sz-team-intro">
      <p>SZ 開發團隊屬於貢獻性質，開發 SZ 相關服務、網站、Discord Bot</p>
      <p>casc</p>
    </section>

    <div class="teams-list">
      <TeamBlock
        v-for="team in teams"
        :key="team.name"
        :team="team.name"
        :techs="team.techs"
        :type="team.type"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import TeamBlock from './components/TeamBlock.vue'
import PageTitle from '@/components/Title/PageTitle.vue'

const teams = [
  {
    name: '後端開發團隊',
    type: 'backend',
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
  @apply text-md mb-[40px];
}

.teams-list {
  @apply flex flex-col items-center gap-[20px];
  @apply tablet:(flex-wrap flex-row justify-center items-stretch);
}
</style>
