<template>
  <div class="otp-input-container">
    <div v-for="(el, index) in inputCount" :key="el + index">
      <n-input
        class="inputer"
        :ref="refs.set"
        type="text"
        v-model:value="valueModel[index]"
        :autofocus="index === 0 && !valueModel[0]"
        maxlength="1"
        placeholder=""
        @keydown="handleKeyDown($event, index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { NInput } from 'naive-ui'
import { useTemplateRefsList } from '@vueuse/core'

const refs = useTemplateRefsList<HTMLDivElement>()

export interface OTPInputProps {
  inputCount: number
}

const props = defineProps<OTPInputProps>()
const emits = defineEmits(['update'])
const valueModel = ref<(string | null)[]>([])

const handleKeyDown = function (event: KeyboardEvent, index: number) {
  if (event.key === 'Backspace') {
    valueModel.value[index] = null
    if (index != 0) refs.value[index - 1].focus()
    return
  }

  if (!new RegExp('^[0-9a-zA-z]+$').test(event.key)) {
    event.preventDefault()
    return
  }

  if (new RegExp('^[0-9a-z]+$').test(event.key)) {
    valueModel.value[index] = event.key.toUpperCase()

    setTimeout(() => {
      if (index != props.inputCount - 1) {
        refs.value[index + 1].focus()
      }
    }, 50)
  }
}

watch(
  valueModel,
  () => {
    emits('update', valueModel.value.join(''))
  },
  { deep: true },
)

onMounted(() => {
  for (let count = 0; count < props.inputCount; count++) {
    valueModel.value.push(null)
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
</style>
