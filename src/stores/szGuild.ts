import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { _SZ_GUILD_CONFIG_URL } from '@/configs/urls'
import { GetAllMembersCount, GetSZGuildInfo, GetAllSZChannel } from '@/api/bot'
import axios from 'axios'
import { get } from 'lodash-es'
import { useFetch } from '@/use/useFetch'

export type SZOpenRole = {
  name: string
  id: string
}

export const useSZGuild = defineStore('szGuild', () => {
  const { fetchDataToValue } = useFetch()
  const guildConfig = ref({})
  const szInfo = ref({})
  const channels = ref([])
  const statistic = reactive({
    members: 0,
  })

  const GetOpenRoles = async () => {
    const res = await axios({
      method: 'GET',
      url: _SZ_GUILD_CONFIG_URL,
    })
    if (!res || !res.data) {
      alert('❗ 錯誤: 取得 api 失敗 !!')
      return
    }
    guildConfig.value = res.data
  }

  const openRoles = computed<SZOpenRole[]>(() => {
    return get(guildConfig.value, 'openRoles', [])
  })
  const registeredRole = computed<string>(() => {
    return get(guildConfig.value, 'registeredRole', '')
  })

  const getAllMembersCount = async () => {
    await fetchDataToValue(
      GetAllMembersCount,
      null,
      { ref: statistic, path: 'members' },
      null,
      { toastError: true },
    )
  }

  const getSZInfo = async () => {
    await fetchDataToValue(GetSZGuildInfo, null, { ref: szInfo }, null, {
      toastError: true,
    })
  }

  const getAllSZChannel = async () => {
    await fetchDataToValue(GetAllSZChannel, null, { ref: channels }, null, {
      toastError: true,
    })
  }

  return {
    channels,
    statistic,
    openRoles,
    getSZInfo,
    GetOpenRoles,
    registeredRole,
    getAllMembersCount,
    getAllSZChannel,
  }
})
