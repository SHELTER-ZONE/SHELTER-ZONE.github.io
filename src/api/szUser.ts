import { api, apiAuth } from '@/lib/axios'

export const FindSZUser = async ({ discordId }: { discordId: string }) => {
  return await apiAuth({
    method: 'GET',
    url: `/user/${discordId}`,
  })
}
