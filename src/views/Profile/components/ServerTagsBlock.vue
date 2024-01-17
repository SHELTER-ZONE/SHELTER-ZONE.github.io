<template>
  <EditableBlock @edit="onEdit">
    <div class="f-row gap-[10px]" v-if="displayRoles.length">
      <n-tag type="success" v-for="role in displayRoles" :key="role.id">
        {{ role.name }}
      </n-tag>
    </div>

    <div v-else class="text-center">尚未擁有任何標籤</div>
  </EditableBlock>
  <EditServerTagsModal
    v-model:show="showEditModal"
    @close="showEditModal = false"
  />
</template>

<script setup lang="ts">
import EditableBlock from '@/components/EditableBlock.vue'
import EditServerTagsModal from './EditServerTagsModal.vue'
import { useOauthStore } from '@/stores/oauth'
import { NTag, useMessage } from 'naive-ui'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { get, filter, includes } from 'lodash-es'
import { useAppStore } from '@/stores/app'
import { ref } from 'vue'

const oauthStore = useOauthStore()
const appStore = useAppStore()
const message = useMessage()
const { user } = storeToRefs(oauthStore)
const { szServer } = storeToRefs(appStore)
const showEditModal = ref<boolean>(false)

const dcRoles = computed(() => get(user.value, 'discord.roles'))
const serverRoles = computed(() => get(szServer.value, 'roles'))

const displayRoles = computed(() => {
  return filter(serverRoles.value, (role) => includes(dcRoles.value, role.id))
})

const onEdit = () => {
  message.warning('抱歉，目前編輯功能開發中，尚未開放 :(,,ŏ ŏ ,,):')
}
</script>

<style scoped lang="postcss"></style>
