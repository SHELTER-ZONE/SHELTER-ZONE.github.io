<template>
  <div class="team-members">
    <TeamMemberCard
      v-for="member in members"
      :key="member.name"
      :data="member"
    />
  </div>
</template>

<script setup lang="ts">
import TeamMemberCard from './TeamMemberCard.vue'

const members = [
  { name: 'Proladon#7525', tags: ['fullStack'] },
  { name: '星曌#4316', tags: ['backend'] },
  { name: 'Irvine#8850', tags: ['frontend', 'ops'] },
]
</script>

<style scoped lang="postcss">
.team-members {
  @apply grid grid-cols-3 gap-[40px];
}
</style>
