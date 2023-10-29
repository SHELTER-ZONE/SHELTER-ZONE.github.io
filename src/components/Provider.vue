<template>
  <NConfigProvider
    :theme="darkTheme"
    id="n-config-provider"
    :theme-overrides="themeOverride"
  >
    <NMessageProvider>
      <NThemeEditor>
        <slot />
      </NThemeEditor>
    </NMessageProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  NMessageProvider,
  darkTheme,
  NThemeEditor,
} from 'naive-ui'
import themeOverride from '@/styles/naive-ui-theme-overrides.json'
</script>

<style scoped lang="postcss"></style>
