<template>
  <main class="home">
    <div class="page-wrapper">
      <!-- <Banner /> -->
      <TeamIntro />

      <button @click="reset">reset</button>
      <br />
      <button @click="pushItem">push</button>

      <StackInfo v-model:value="items" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Banner from './components/Banner.vue'
import TeamIntro from './components/TeamIntro/TeamIntro.vue'
import StackInfo from '@/components/StackInfo/StackInfo.vue'

const items = ref([
  {
    name: 'test',
    id: 1,
    state: 'resolve',
  },
])

const count = ref(1)

const reset = () => {
  count.value = 1
  items.value = [
    {
      name: 'test',
      id: 1,
      state: 'resolve',
    },
  ]
}

const pushItem = () => {
  count.value += 1
  // const index = JSON.parse(JSON.stringify(count.value))
  const index = count.value
  items.value.push({
    name: 'test',
    id: index,
    state: 'processing',
  })

  setTimeout(() => {
    items.value[index - 1].state = 'resolve'
  }, 1000)
}
</script>

<style lang="postcss" scoped>
.page-wrapper {
  @apply pt-[100px];
  @apply max-w-[1200px] m-auto;
}
</style>
