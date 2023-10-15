import { api, apiAuth } from './instance'

export const FindSZUser = async ({ discordId }: { discordId: string }) => {
  console.log('discordId', discordId)
  return await apiAuth({
    method: 'GET',
    url: `/user/${discordId}`,
  })
}
