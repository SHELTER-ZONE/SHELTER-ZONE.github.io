<template>
  <n-form ref="formRef" class="verify-form">
    <n-form-item label="避難者 ID" path="name">
      <n-input placeholder="避難者 ID" />
    </n-form-item>
    <n-form-item label="來源" path="name">
      <n-select :options="values(fromSourcesConfig)" placeholder="避難者 ID" />
    </n-form-item>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { NForm, NFormItem, NInput, NSelect } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'
import { fromSourcesConfig } from '@/configs/verifyForm'
import { values } from 'lodash-es'

const formRef = ref<null>()

const { user } = useOauthStore()

const formData = reactive({
  name: null,
})
</script>

<style scoped lang="postcss">
.verify-form {
  @apply max-w-[500px] m-auto;
}
</style>
