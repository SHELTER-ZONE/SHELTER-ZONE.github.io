<template>
  <NConfigProvider :theme="darkTheme" id="n-config-provider">
    <slot />
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui'
</script>

<style scoped lang="postcss"></style>
