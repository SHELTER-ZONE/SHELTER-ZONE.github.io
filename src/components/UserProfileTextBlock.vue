<template>
  <div class="profile-text-block">
    <n-spin :show="loading">
      <n-input
        v-if="editMode"
        type="textarea"
        v-model:value="profileText"
        :maxlength="2000"
        show-count
        :autosize="{
          minRows: 10,
        }"
      />

      <div v-show="!editMode">
        <pre v-if="szUserProfile.profileText">{{
          szUserProfile.profileText
        }}</pre>
        <div
          v-if="!preview && !szUserProfile.profileText"
          class="full flex justify-center items-center"
        >
          <span>(個人介紹) 尚未填寫任何內容</span>
        </div>
      </div>

      <div v-if="editMode" class="f-row justify-end pt-[20px] gap-[10px]">
        <BaseButton @click="emits('confirm')"> Cancel </BaseButton>
        <BaseButton type="primary" @click="onUpdate"> Confirm </BaseButton>
      </div>
    </n-spin>
  </div>
</template>

<script setup lang="ts">
import { NInput, useMessage, NSpin } from 'naive-ui'
import { ref, watchEffect } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { UpdateSZUserProfile } from '@/api/szUserProfile'
import { useFetch } from '@/use/useFetch'
import { useOauthStore } from '@/stores/oauth'
import { storeToRefs } from 'pinia'
import { get } from 'lodash-es'
import notifyMessage from '@/configs/notifyMessage'

interface ProfileTextBlockProps {
  editMode: boolean
  preview: boolean
}

const emits = defineEmits(['confirm'])

const props = withDefaults(defineProps<ProfileTextBlockProps>(), {
  editMode: false,
  preview: true,
})

const { fetchData } = useFetch()
const message = useMessage()
const oauthStore = useOauthStore()
const { szUserProfile } = storeToRefs(oauthStore)

const profileText = ref<string | null>(null)
const loading = ref<boolean>(false)

watchEffect(() => {
  if (props.editMode)
    profileText.value = get(szUserProfile.value, 'profileText')
})

const onUpdate = async () => {
  loading.value = true

  await fetchData(
    UpdateSZUserProfile,
    {
      userProfileId: get(szUserProfile.value, 'id'),
      profileText: profileText.value,
    },
    async () => {
      try {
        await oauthStore.findMeSZUser()
        loading.value = false
        message.success(notifyMessage.updateSuccess)
        emits('confirm')
      } catch (error: any) {
        message.error(error)
      }
    },
    () => {
      loading.value = false
    },
  )
}
</script>

<style scoped lang="postcss">
.profile-text-block {
  @apply w-full;
}

:deep(.n-input-wrapper) {
  @apply text-normal tracking-wide;
}

:deep(.n-input__textarea-el) {
  @apply tracking-[0.05em];
}

pre {
  font-family: 'Quicksand';
  @apply text-normal;
}
</style>
