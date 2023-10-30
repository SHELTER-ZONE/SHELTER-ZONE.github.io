<template>
  <n-form ref="formRef" class="verify-form">
    <div class="grid grid-cols-2 gap-30px">
      <n-form-item label="避難者 ID" path="name">
        <n-input />
      </n-form-item>
      <n-form-item label="來源" path="name">
        <n-select :options="values(fromSourcesConfig)" />
      </n-form-item>
    </div>

    <n-button secondary block type="primary">進行驗證</n-button>
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { NForm, NFormItem, NInput, NSelect, NButton } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'
import { fromSourcesConfig } from '@/configs/verifyForm'
import { Tag } from '@vicons/carbon'
import { values } from 'lodash-es'

const formRef = ref<null>()

const { user } = useOauthStore()

const formData = reactive({
  name: null,
})
</script>

<style scoped lang="postcss">
.verify-form {
  @apply max-w-[800px] w-full m-auto;
}
</style>
