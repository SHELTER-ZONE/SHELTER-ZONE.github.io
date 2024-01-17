import { api, apiAuth } from '@/lib/axios'

export const FindSZUser = async ({ discordId }: { discordId: string }) => {
  console.log('discordId', discordId)
  return await apiAuth({
    method: 'GET',
    url: `/user/${discordId}`,
  })
}
