<template>
  <div class="tram-intro">
    <SectionTitle title="Development Team">
      <template #prefix>💻</template>
    </SectionTitle>
    <TeamMembers />
  </div>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/Title/SectionTitle.vue'
import TeamMembers from './components/TeamMembers.vue'

import { Code } from '@vicons/carbon'
</script>

<style scoped lang="postcss"></style>
