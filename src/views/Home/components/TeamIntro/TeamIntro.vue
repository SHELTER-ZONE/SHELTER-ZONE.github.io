<template>
  <div class="team-intro">
    <SectionTitle title="Development Team">
      <template #prefix>💻</template>
    </SectionTitle>
    <TeamMembers />
  </div>
</template>

<script setup lang="ts">
import SectionTitle from '@/components/Title/SectionTitle.vue'
import TeamMembers from './components/TeamMembers.vue'
</script>

<style scoped lang="postcss"></style>
