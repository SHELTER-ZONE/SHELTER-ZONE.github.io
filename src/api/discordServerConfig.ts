import { apiAuth } from '@/lib/axios'
import { SZ_SERVER_ID } from '@/utils/variables'

export const FindDiscordServerConfig = async () => {
  return await apiAuth({
    method: 'GET',
    url: `/discordServerConfig/${SZ_SERVER_ID}`,
  })
}
