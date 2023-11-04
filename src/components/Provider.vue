<template>
  <NConfigProvider
    :theme="darkTheme"
    id="n-config-provider"
    :theme-overrides="themeOverride"
  >
    <NNotificationProvider>
      <NDialogProvider>
        <NMessageProvider>
          <NThemeEditor>
            <slot />
          </NThemeEditor>
        </NMessageProvider>
      </NDialogProvider>
    </NNotificationProvider>
  </NConfigProvider>
</template>

<script setup lang="ts">
import {
  NConfigProvider,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  darkTheme,
  NThemeEditor,
} from 'naive-ui'
import themeOverride from '@/styles/naive-ui-theme-overrides.json'
</script>

<style scoped lang="postcss"></style>
