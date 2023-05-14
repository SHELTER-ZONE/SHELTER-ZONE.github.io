<template>
  <div class="topic-intro">
    <section>
      <SZBlockContainer class="full">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam assumenda
        tenetur officia, ut ullam adipisci nemo nobis alias nihil dolor? Culpa
        pariatur, commodi in nam suscipit corrupti? Earum, ipsam numquam!
      </SZBlockContainer>
    </section>

    <section class="flex flex-col gap-[20px]">
      <SZBlockContainer>
        <p class="text-center mb-[10px]">討論度</p>
        <n-progress
          type="line"
          :show-indicator="false"
          status="success"
          :percentage="20"
        />
      </SZBlockContainer>
      <SZBlockContainer>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam assumenda
        tenetur officia, ut ullam adipisci nemo nobis alias nihil dolor? Culpa
        pariatur, commodi in nam suscipit corrupti? Earum, ipsam numquam!
      </SZBlockContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { SZBlockContainer } from '@shelter-zone/shelter-ui'
import { NProgress } from 'naive-ui'
</script>

<style scoped lang="postcss">
.topic-intro {
  @apply flex flex-col gap-[20px];
  @apply tablet:(flex-row flex-row-reverse);
}
</style>
