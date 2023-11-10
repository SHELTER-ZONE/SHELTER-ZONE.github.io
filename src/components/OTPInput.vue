<template>
  <div class="otp-input-container">
    <div v-for="(el, index) in inputCount" :key="el + index">
      <n-input
        class="inputer"
        :ref="refs.set"
        :status="error ? 'error' : undefined"
        type="text"
        v-model:value="syncValue[index]"
        :autofocus="index === 0 && !syncValue[0]"
        :disabled="disabled"
        maxlength="1"
        placeholder=""
        @keydown="handleKeyDown($event, index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watchEffect } from 'vue'
import { NInput } from 'naive-ui'
import { useTemplateRefsList, useVModel } from '@vueuse/core'
import { every } from 'lodash-es'

export interface OTPInputProps {
  inputCount: number
  disabled: boolean
  error: boolean
  value: (string | null)[]
  onVerify: Function
}

const props = withDefaults(defineProps<OTPInputProps>(), {
  disabled: false,
  error: false,
})
const emits = defineEmits(['update', 'update:value'])
const syncValue = useVModel(props, 'value', emits)
const refs = useTemplateRefsList<HTMLInputElement>()

const handleKeyDown = function (event: KeyboardEvent, index: number) {
  if (event.key === 'Backspace') {
    syncValue.value[index] = null
    if (index != 0) refs.value[index - 1].focus()
    return
  }

  if (!new RegExp('^[0-9a-z]+$').test(event.key)) {
    event.preventDefault()
    return
  }

  if (new RegExp('^[0-9a-z]+$').test(event.key)) {
    syncValue.value[index] = event.key.toUpperCase()
    if (
      index === props.inputCount - 1 &&
      every(syncValue.value, (i) => i !== null)
    ) {
      props.onVerify(refs)
      return
    }
    setTimeout(() => {
      if (index != props.inputCount - 1) {
        refs.value[index + 1].focus()
      }
    }, 50)
  }
}

// watchEffect(async () => {
//   if (!syncValue.value || !syncValue.value.length) return
//   if (every(syncValue.value, (i) => i !== null)) props.onVerify(refs)
// })

onMounted(() => {
  if (!syncValue.value || !syncValue.value.length) {
    for (let count = 0; count < props.inputCount; count++) {
      syncValue.value.push(null)
    }
  }
})
</script>

<style scoped lang="postcss">
:deep(.n-input__input) {
  @apply flex items-center justify-center text-md;
}
:deep(.n-input__input-el) {
  @apply font-bold text-primary;
}

.otp-input-container {
  @apply flex justify-between gap-5px;
  @apply <tablet:(grid grid-cols-4 place-items-center w-fit m-auto gap-x-10px gap-y-20px);
}

.inputer {
  @apply !w-50px h-50px text-center;
}

.disabled {
  @apply pointer-events-none;
}
</style>
