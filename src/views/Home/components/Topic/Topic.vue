<template>
  <article class="topic">
    <header>
      <SectionTitle title="Topic Zone">
        <template #prefix>💬</template>
      </SectionTitle>
    </header>

    <main>
      <TopicIntro
        v-for="topic in topics"
        :key="topic.name"
        :topic="topic.topic"
        :id="topic.id"
        :trends="topic.trends"
        :description="topic.description"
        :channels="topic.channels"
      />
    </main>
  </article>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/Title/SectionTitle.vue'
import TopicIntro from './components/TopicIntro.vue'
import { computed } from 'vue'
import { filter } from 'lodash-es'
import { useSZGuild } from '@/stores/szGuild'

const szGuildStore = useSZGuild()

const filterCategoryChannels = (categoryId: string) => {
  return filter(szGuildStore.channels, (ch: any) => ch.parent_id === categoryId)
}

const topics = [
  {
    topic: '💻 程式技術 ZONE',
    name: 'Coding',
    id: '799927437877837824',
    trends: 80,
    description: 'csacascasc',
    channels: computed(() => filterCategoryChannels('799927437877837824')),
  },
  {
    topic: '📦 3D技術 ZONE',
    name: '3D',
    id: '799927730572623882',
    trends: 20,
    description: 'csacascasc',
    channels: computed(() => filterCategoryChannels('799927730572623882')),
  },
  {
    topic: '🎮 ACG ZONE',
    name: 'ACG',
    id: '799927616429359134',
    trends: 10,
    description: 'csacascasc',
    channels: computed(() => filterCategoryChannels('799927616429359134')),
  },
]
</script>

<style scoped lang="postcss">
.topic {
  @apply max-w-[700px] m-auto;
}
.topic main {
  @apply flex flex-col gap-[30px] items-center;
}

@media screen and (min-width: 765px) {
  .topic main {
    @apply flex-row justify-center items-stretch;
  }
}
</style>
