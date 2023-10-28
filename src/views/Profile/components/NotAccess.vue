<template>
  <SZBlockContainer class="w-full">
    <div class="flex flex-col justify-center items-center gap-[20px] py-[40px]">
      <n-icon :size="48"><Campsite /></n-icon>
      <div class="flex flex-col items-center">
        <n-icon :size="20" color="var(--danger)"><Locked /></n-icon>
        <p class="text-danger">cacascascsacsa</p>
      </div>

      <!-- <div>
        <n-button>cascsac</n-button>
        <n-button>cascsac</n-button>
      </div> -->
    </div>
  </SZBlockContainer>
</template>

<script setup>
import { Campsite, Locked, WarningFilled } from '@vicons/carbon'
import { NIcon, NButton } from 'naive-ui'
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
</script>

<style scoped lang="postcss"></style>
