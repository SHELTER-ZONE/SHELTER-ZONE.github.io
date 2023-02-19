<template>
  <NConfigProvider :theme="darkTheme">
    <slot />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui'
</script>

<style scoped lang="postcss"></style>
