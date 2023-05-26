<template>
  <main class="sz-team">
    <section>
      <h1>Service Development Team</h1>
      <SZBlockContainer class="w-fit">
        <p class="text-center">Tech Stack</p>
        <div class="flex flex-col gap-[20px] items-center">
          <img
            class="m-auto"
            src="https://skillicons.dev/icons?i=vscode,docker,figma,vue"
            alt=""
          />
          <img
            src="https://skillicons.dev/icons?i=vite,express,nodejs,js"
            alt=""
          />
          <img
            src="https://skillicons.dev/icons?i=ts,html,css,windicss"
            alt=""
          />
        </div>
      </SZBlockContainer>
    </section>
    <section>
      <h1>Bot Development Team</h1>
    </section>
  </main>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
</script>

<style scoped lang="postcss">
.sz-team {
  @apply viewPx pt-[150px];
}
</style>
