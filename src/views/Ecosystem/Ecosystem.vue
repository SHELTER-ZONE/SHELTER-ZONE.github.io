<template>
  <main class="applications">
    <div class="container">
      <ResourceCard v-for="item in applications" :key="item.name" :data="item">
        <h3>{{ item.name }}</h3>
      </ResourceCard>
    </div>
    <div class="container">
      <ResourceCard v-for="item in docs" :key="item.name" :data="item">
        <h3>{{ item.name }}</h3>
      </ResourceCard>
    </div>
  </main>
</template>

<script setup>
import ResourceCard from './components/ResourceCard.vue'
const applications = [
  {
    name: 'SZ-Form',
    description: '',
    link: 'https://shelter-zone.github.io/sz-form-frontend/',
  },
  {
    name: 'SZ Question Template Generator',
    description: '',
    link: 'https://shelter-zone.github.io/Question-Template/',
  },
]

const docs = [
  {
    name: 'Technological Exchange Guide',
    description: '',
    link: 'https://shelter-zone.github.io/Technological-Exchange-Guide/',
  },
  {
    name: 'Discord Bot FAQ',
    description: '',
    link: 'https://shelter-zone.github.io/Discord_Bot_FAQ/',
  },
]
</script>

<style scoped lang="postcss">
.applications {
  @apply pt-[100px];
  @apply flex flex-col items-center gap-[60px];
}

.container {
  @apply w-full;
  @apply flex gap-[30px];
}
</style>
