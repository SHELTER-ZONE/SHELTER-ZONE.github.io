<template>
  <div class="topic-tabs">
    <n-tabs>
      <n-tab v-for="tab in tabs" :key="tab.value" :name="tab.value">
        {{ tab.label }}
      </n-tab>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { NTabs, NTab } from 'naive-ui'

type TopicTab = {
  label: string
  value: string
}

interface TopicTabsProps {
  tabs: TopicTab[]
}

defineProps<TopicTabsProps>()
</script>

<style scoped lang="postcss"></style>
