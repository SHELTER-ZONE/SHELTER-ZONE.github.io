<template>
  <main class="ecosystem">
    <div class="f-col gap-[30px]">
      <section class="resource-section">
        <h3 class="resource-section-title">
          <n-icon><ApplicationWeb /></n-icon>
          <p>Applications</p>
        </h3>
        <div class="resource-list">
          <div v-for="item in applications" :key="item.name">
            <ResourceCard v-if="!item.disabled" :data="item" />

            <StatusMask
              v-if="item.disabled"
              text="施工中"
              status="blocked"
              :iconSize="30"
            >
              <ResourceCard :data="item" />
            </StatusMask>
          </div>
        </div>
      </section>

      <section class="resource-section">
        <h3 class="resource-section-title">
          <n-icon><Bookmark /></n-icon>
          <p>Document</p>
        </h3>
        <div class="resource-list">
          <ResourceCard v-for="item in docs" :key="item.name" :data="item" />
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import StatusMask from '@/components/StatusMask.vue'
import ResourceCard from './components/ResourceCard.vue'
import { NIcon } from 'naive-ui'
import {
  LicenseDraft,
  Template,
  Book,
  Help,
  ApplicationWeb,
  Bookmark,
} from '@vicons/carbon'

const applications = [
  {
    name: 'SZ-Form',
    description: 'SZ 表單系統',
    icon: LicenseDraft,
    link: 'https://shelter-zone.github.io/sz-form-frontend/',
    disabled: true,
  },
  {
    name: 'SZ Question Template Generator',
    description: 'SZ 提問模板生成器',
    icon: Template,
    link: 'https://shelter-zone.github.io/Question-Template/',
  },
]

const docs = [
  {
    name: 'Technological Exchange Guide',
    description: 'SZ 技術交流指南',
    icon: Book,
    link: 'https://shelter-zone.github.io/Technological-Exchange-Guide/',
  },
  {
    name: 'Discord Bot FAQ',
    description: 'Discord Bot 開發常見 FAQ',
    icon: Help,
    link: 'https://shelter-zone.github.io/Discord_Bot_FAQ/',
  },
]
</script>

<style scoped lang="postcss">
.ecosystem {
  @apply viewPx pt-[150px];
  @apply max-w-[800px] m-auto;
  @apply flex flex-col gap-[40px];
}

.resource-section-title {
  @apply flex items-center gap-[10px];
  @apply text-[20px] text-primary mb-[15px];
}

.resource-list {
  @apply flex flex-col gap-[20px];
}
</style>
