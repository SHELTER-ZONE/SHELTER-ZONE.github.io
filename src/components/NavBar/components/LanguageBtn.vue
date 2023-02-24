<template>
  <NDropdown trigger="click" :options="languageOptions" :on-select="onChange">
    <NButton quaternary type="info">
      <template #icon>
        <NIcon><Translate /></NIcon>
      </template>

      <div class="flex items-center gap-[10px]">
        <p>{{ get(localeOptions[locale], 'label') }}</p>
        <NIcon><ChevronDown /></NIcon>
      </div>
    </NButton>
  </NDropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NIcon, NButton, NDropdown } from 'naive-ui'
import { Translate } from '@vicons/carbon'
import { useLocale, type Locale } from '@/use/useLocale'
import { ChevronDown } from '@vicons/carbon'
import { get, map } from 'lodash-es'

const { localeOptions, locale, changeLocale } = useLocale()

const languageOptions = computed(() => {
  return map(localeOptions, (locale) => ({
    label: locale.label,
    key: locale.value,
  }))
})

const onChange = (locale: Locale) => {
  changeLocale(locale)
}
</script>

<style scoped lang="postcss"></style>
