<template>
  <Provider>
    <RouterView />
  </Provider>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Provider from './components/Provider.vue'
</script>

<style scoped></style>
