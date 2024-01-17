<template>
  <n-form-item label="主要職業" path="mainTech">
    <div class="grid grid-cols-3 gap-[10px] w-full">
      <div
        class="select-tag-item"
        v-for="role in displayRoles"
        :key="role.id"
        @click="syncForm = role.id"
        :class="{ active: role.id === syncForm }"
      >
        {{ role.name }}
      </div>
    </div>
  </n-form-item>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { NFormItem } from 'naive-ui'
import { selectabledRoles } from '@/configs/userProfile'
import { computed } from 'vue'
import { get, filter, includes } from 'lodash-es'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

interface MainTechTagSelectorProps {
  formData: string | null
}

const props = defineProps<MainTechTagSelectorProps>()
const emits = defineEmits(['update:formData'])

const syncForm = useVModel(props, 'formData', emits)
const appStore = useAppStore()
const { szServer } = storeToRefs(appStore)

const serverRoles = computed(() => get(szServer.value, 'roles'))

const displayRoles = computed(() => {
  return filter(serverRoles.value, (role) =>
    includes(selectabledRoles, role.id),
  )
})
</script>

<style scoped lang="postcss">
.select-tag-item {
  @apply border-base border-1 px-[10px] py-[5px] rounded-normal w-full cursor-pointer;
  @apply font-medium;
}

.active {
  @apply border-primary bg-primary text-primary-bg;
}
</style>
