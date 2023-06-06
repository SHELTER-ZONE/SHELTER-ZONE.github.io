<template>
  <!-- <div class="border border-light-100 h-full"> -->
  <SZBlockContainer class="team-block">
    <article class="team-block-wrapper">
      <header>
        <n-icon :color="teamTypeColorConfig[data.type]" size="30">
          <component :is="get(teamTypeIconConfig, data.type)" />
        </n-icon>
        <h2 class="team-name">
          <span>{{ data.name }}</span>
        </h2>
      </header>
      <main>
        <section class="team-descript">
          <p>{{ data.description }}</p>
        </section>
        <section>
          <p class="section-label">Tech Stack</p>
          <div class="flex flex-col gap-[20px] items-center">
            <img
              v-for="(techs, index) in techStack"
              :key="techs.join(',')"
              class="m-auto"
              :src="techStackImage(index)"
              :alt="`team techStack: ${techs.join(',')}`"
            />
          </div>
        </section>
      </main>
      <footer>
        <n-button type="primary" block secondary>Join Team</n-button>
      </footer>
    </article>
  </SZBlockContainer>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { chunk, get } from 'lodash-es'
import { NButton, NIcon } from 'naive-ui'
import { teamTypeIconConfig, teamTypeColorConfig } from '@/configs/team'
import type { TeamBlockProps } from '../types'

const props = defineProps<TeamBlockProps>()

const techStack = computed(() => {
  const techs = get(props, 'data.techs', [])
  return chunk(techs, 4)
})

const techStackImage = computed(() => {
  return (index: number) => {
    const techs = techStack.value[index]
    return `https://skillicons.dev/icons?i=${techs.join(',')}`
  }
})
</script>

<style scoped lang="postcss">
.team-name {
  @apply text-lg text-center font-bold;
  @apply flex items-center justify-center gap-[5px];
}

.section-label {
  @apply text-center mb-[12px];
}

.team-block-wrapper {
  @apply flex flex-col full;
}

.team-descript {
  @apply my-[20px] text-center;
}

.team-block-wrapper header {
  @apply flex flex-col items-center gap-[12px];
}

.team-block-wrapper main {
  @apply flex-1 mb-[50px];
}
</style>
