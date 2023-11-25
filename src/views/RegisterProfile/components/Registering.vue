<template>
  <div class="registering">
    <img
      class="rounded-[7px]"
      src="https://i.pinimg.com/originals/0b/5c/c0/0b5cc024841accd9a31a7b2daeb0e57b.gif"
    />
    正在建立您的檔案中，請稍後
    <n-spin :size="20" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RegisterSZUserProfile } from '@/api/szUserProfile'
import { NSpin, useMessage } from 'naive-ui'
import { useOauthStore } from '@/stores/oauth'
import { get } from 'lodash-es'
import { onMounted } from 'vue'
import { nextTick } from 'vue'
import { useErrorPage } from '@/use/useErrorPage'

interface RegisteringProps {
  formData: Record<string, any>
}

const props = defineProps<RegisteringProps>()
const emits = defineEmits(['complete'])
const oauthStore = useOauthStore()
const message = useMessage()
const { errorPageData, rawErrorDataFormat } = useErrorPage()

const payloadData = computed(() => {
  return {
    userId: get(oauthStore.user, 'sz.id'),
    ...props.formData,
  }
})

const registerSZUserProfile = async () => {
  const [, err, rawErr]: any = await RegisterSZUserProfile(payloadData.value)
  if (err) {
    message.error(err.message)
    errorPageData.value = {
      code: err.code,
      message: err.message,
      ...rawErrorDataFormat(rawErr),
    }
    return
  }
  await oauthStore.findMeSZUser()
  emits('complete', 'Registering')
}

onMounted(async () => {
  await nextTick()
  await registerSZUserProfile()
})
</script>

<style scoped lang="postcss">
.registering {
  @apply flex flex-col items-center gap-20px;
}
</style>
