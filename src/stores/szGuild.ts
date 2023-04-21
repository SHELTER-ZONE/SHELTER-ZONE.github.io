import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { _SZ_GUILD_CONFIG_URL } from '@/configs/urls'
import axios from 'axios'
import { get } from 'lodash-es'

export type SZOpenRole = {
  name: string
  id: string
}

export const useSZGuild = defineStore('szGuild', () => {
  const guildConfig = ref({})

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

  const openRoles = computed(() => {
    return get(guildConfig.value, 'openRoles', [])
  })

  return {
    openRoles,
    GetOpenRoles,
  }
})
