<template>
  <article class="explore-user-item">
    <SZBlockContainer class="full">
      <n-image
        class="user-avatar"
        width="100%"
        :src="ImagePlaceholder"
        alt="discord user avatar"
        preview-disabled
      />
      <header class="f-col gap-[12px] justify-between">
        <n-skeleton
          class="mt-20px mb-5px"
          width="100%"
          :sharp="false"
          height="18px"
        />

        <div class="tags">
          <n-skeleton width="100%" :sharp="false" size="medium" />
        </div>
      </header>
    </SZBlockContainer>
  </article>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { NImage, NSkeleton } from 'naive-ui'
import ImagePlaceholder from '@/assets/default/image_placeholder.webp'
</script>

<style scoped lang="postcss">
.explore-user-item {
  @apply w-[180px] h-full overflow-hidden rounded-normal;
  @apply shadow-xl relative;
}

.user-avatar {
  @apply w-full rounded-lg;
}
</style>
