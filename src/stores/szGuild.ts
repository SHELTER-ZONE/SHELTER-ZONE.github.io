import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { _SZ_GUILD_CONFIG_URL } from '@/configs/urls'
import { getAllMembersCount, getSZGuildInfo } from '@/api/bot'
import axios from 'axios'
import { get } from 'lodash-es'

export type SZOpenRole = {
  name: string
  id: string
}

export const useSZGuild = defineStore('szGuild', () => {
  const guildConfig = ref({})
  const szInfo = ref({})
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
  const unverifyRole = computed<string>(() => {
    return get(guildConfig.value, 'unverifyRole', '')
  })

  const GetAllMembersCount = async () => {
    const [res, err]: any = await getAllMembersCount()
    if (err) window.$message.error(err)
    if (res) statistic.members = res
  }

  const GetSZInfo = async () => {
    const [res, err]: any = await getSZGuildInfo()
    if (err) window.$message.error(err)
    if (res) szInfo.value = res
  }

  return {
    statistic,
    openRoles,
    GetSZInfo,
    GetOpenRoles,
    unverifyRole,
    GetAllMembersCount,
  }
})
