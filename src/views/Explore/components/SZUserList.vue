<template>
  <main class="sz-user-list">
    <router-link
      v-for="user in userList"
      :key="user.id"
      :to="{
        name: 'PersonalShelter',
        params: { discordId: user.discordId },
      }"
    >
      <div>
        {{ user?.name }}
      </div>
    </router-link>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface SZUserListProps {
  userList: any[]
}

const props = withDefaults(defineProps<SZUserListProps>(), {
  userList: () => [],
})
</script>

<style scoped lang="postcss"></style>
