<template>
  <main class="server-news">
    <AreaBlock class="w-300px">
      <nav class="news-list">
        <div
          class="news-item"
          :class="{ 'active-news': news.id === selectNews.id }"
          v-for="news in displayNewsList"
          :key="news.id"
          @click="onSelectNews(news.id)"
        >
          {{ news.title }}
        </div>
      </nav>
    </AreaBlock>

    <AreaBlock class="w-full">
      <article v-if="selectNews">
        <DiscordContent :message="selectNews" />
      </article>
    </AreaBlock>
  </main>
</template>

<script setup lang="ts">
import DiscordContent from '@/components/DiscordContent.vue'
import AreaBlock from '@/components/AreaBlock.vue'
import { useSZGuild } from '@/stores/szGuild'
import { ellipsisText } from '@/utils/helper'
import { computed, ref, watchEffect } from 'vue'
import { get, map, find } from 'lodash-es'
import { storeToRefs } from 'pinia'

const szGuildStore = useSZGuild()
const { serverNews } = storeToRefs(szGuildStore)
const selectNews = ref(serverNews.value[0])

const displayNewsList = computed(() => {
  const dataList = map(serverNews.value, (news) => {
    const title = get(news.content.split('\n'), `[0]`)
    return {
      id: news.id,
      title: ellipsisText(title),
    }
  })
  return dataList
})

const onSelectNews = (id: string) => {
  selectNews.value = find(szGuildStore.serverNews, { id })
}

watchEffect(() => {
  selectNews.value = serverNews.value[0]
})
</script>

<style scoped lang="postcss">
.server-news {
  @apply viewPx viewPt viewMax h-full m-auto;
  @apply flex gap-[30px] justify-center;
  @apply relative;
}

.news-list {
  @apply flex flex-col gap-[12px];
  @apply sticky top-[100px];
}
.news-item {
  @apply truncate text-base hover:(text-primary underline);
  @apply cursor-pointer transition-all duration-400 ease-in-out;
}

.active-news {
  @apply text-primary;
}
</style>
