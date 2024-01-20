<template>
  <n-form-item :label="title" :path="formItemPath">
    <div class="grid grid-cols-3 gap-[10px] w-full">
      <BaseButton
        class="select-tag-item"
        v-for="role in displayRoles"
        :key="role.id"
        @click="onSelectRole(role)"
        :type="roleActive(role) ? 'primary' : 'default'"
      >
        {{ role.name }}
      </BaseButton>
    </div>
  </n-form-item>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { NFormItem } from 'naive-ui'
import { computed } from 'vue'
import { map, get, find, filter, pull, includes } from 'lodash-es'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import BaseButton from '@/components/BaseButton.vue'

interface MainTechTagSelectorProps {
  title: string
  value: string | null | string[]
  roles: any[]
  multiple?: boolean
  formItemPath?: string
}

const props = withDefaults(defineProps<MainTechTagSelectorProps>(), {
  title: '',
  roles: () => [],
  value: () => [],
})
const emits = defineEmits(['update:value', 'change'])

const appStore = useAppStore()
const { szServer } = storeToRefs(appStore)

const syncValue = useVModel(props, 'value', emits)

const serverRoles = computed(() => get(szServer.value, 'roles'))

const roleActive = computed(() => {
  return (role) => {
    if (!props.multiple) return syncValue.value === role.id
    else if (props.multiple) return includes(syncValue.value, role.id)
  }
})

const displayRoles = computed(() => {
  const data = map(props.roles, (role) => {
    return {
      name: role.name,
      id: role.id,
    }
  })

  return filter(data, (role) => find(serverRoles.value, { id: role.id }))
})

const onSelectRole = (role: any) => {
  emits('change')
  if (!props.multiple) {
    if (syncValue.value === role.id) syncValue.value = null
    else syncValue.value = role.id
  } else if (props.multiple) {
    if (includes(syncValue.value, role.id)) pull(syncValue.value, role.id)
    else syncValue.value.push(role.id)
  }
}
</script>

<style scoped lang="postcss">
:deep(.n-form-item-label__text) {
  @apply text-base;
}

.select-tag-item {
  @apply !font-medium;
}
</style>
