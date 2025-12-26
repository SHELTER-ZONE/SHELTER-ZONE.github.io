<template>
  <header>
    <SHFlexContainer justify="between" align="center" class="p-4" :gap="8">
      cascasc
      <LoginBtn />
    </SHFlexContainer>
  </header>
</template>

<script setup lang="ts">
import { SHFlexContainer } from '@proladon/shelter-ui'
import LoginBtn from './LoginBtn.vue'
</script>

<style lang="postcss" scoped></style>
