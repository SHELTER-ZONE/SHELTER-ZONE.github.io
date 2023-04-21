<template>
  <NConfigProvider :theme="darkTheme" id="n-config-provider">
    <NMessageProvider>
      <slot />
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui'
</script>

<style scoped lang="postcss"></style>
