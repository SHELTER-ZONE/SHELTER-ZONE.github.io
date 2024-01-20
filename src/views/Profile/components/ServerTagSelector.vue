<template>
  <n-form-item :label="title" :path="formItemPath">
    <div class="grid grid-cols-3 gap-[10px] w-full">
      <div
        class="select-tag-item"
        v-for="role in displayRoles"
        :key="role.id"
        @click="onSelectRole(role)"
        :class="{ active: roleActive(role) }"
      >
        {{ role.name }}
      </div>
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

const onrestore = (args) => {
  console.log(args)
}
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
