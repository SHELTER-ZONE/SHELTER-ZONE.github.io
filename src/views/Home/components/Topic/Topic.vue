<template>
  <div class="topic">
    <SectionTitle title="Topic" />

    <header class="flex justify-center gap-[20px]">
      <div v-for="topic in topics" :key="topic.name">
        {{ topic.name }}
      </div>
    </header>

    <main>cwqacasc</main>
  </div>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/Title/SectionTitle.vue'
import { NIcon } from 'naive-ui'
import {} from '@vicons/carbon'

const topics = [
  { name: 'Coding', icon: null },
  { name: '3D', icon: null },
  { name: '2D', icon: null },
]
</script>

<style scoped lang="postcss"></style>
