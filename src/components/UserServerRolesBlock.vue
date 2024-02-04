<template>
  <div class="f-row gap-[10px]" v-if="displayRoles.length">
    <template v-for="role in displayRoles" :key="role.id">
      <div v-if="showOtherRoles ? true : !isOptionalRole(role)">
        <n-tooltip trigger="hover">
          <template #trigger>
            <BaseTag
              :type="roleTagTyping(role)"
              :class="{ 'optional-tag': isOptionalRole(role) }"
              :disabled="isOptionalRole(role)"
              :bordered="false"
            >
              {{ role.name }}
            </BaseTag>
          </template>
          <p>
            <span v-if="isMainRole(role)">主要身分 (公開顯示)</span>
            <span v-if="isDevTeamRole(role)">特殊身分 (公開顯示)</span>
            <span v-if="isOptionalRole(role)">可選身分 (不公開顯示)</span>
          </p>
        </n-tooltip>
      </div>
    </template>
  </div>

  <div v-if="!displayRoles.length && !preview" class="text-center">
    尚未擁有任何標籤
  </div>
</template>

<script setup lang="ts">
import BaseTag from '@/components/BaseTag.vue'
import { NTooltip } from 'naive-ui'
import { computed, withDefaults } from 'vue'
import { storeToRefs } from 'pinia'
import { get, filter, includes, map } from 'lodash-es'
import { useSZGuild } from '@/stores/szGuild'
import type { APIGuildMember, APIRole } from 'discord-api-types/v10'
import { useServerRole } from '@/use/useServerRole'

export interface UserServerRolesBlockProps {
  dcMember: APIGuildMember | null
  showOtherRoles?: boolean
  preview: boolean
}

const props = withDefaults(defineProps<UserServerRolesBlockProps>(), {
  dcMember: null,
  preview: true,
})

const szGuildStore = useSZGuild()
const { serverRoles } = storeToRefs(szGuildStore)
const { isDevTeamRole, isMainRole, isOptionalRole, roleTagTyping } =
  useServerRole()

const dcMemberRoles = computed(() => get(props.dcMember, 'roles'))

const displayRoles = computed(() => {
  return filter(serverRoles.value, (role: APIRole) =>
    includes(dcMemberRoles.value, role.id),
  )
})
</script>

<style scoped lang="postcss">
.optional-tag {
  @apply bg-base text-white;
}
</style>
