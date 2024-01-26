import { api, apiAuth } from '@/lib/axios'

export const FindSZUser = async ({ discordId }: { discordId: string }) => {
  return await apiAuth({
    method: 'GET',
    url: `/user/${discordId}`,
  })
}

export const GetSZUser = async ({
  name,
  discordId,
  start,
  limit = 10,
}: {
  start: number
  limit: number
  name: string
  discordId: string
}) => {
  return await apiAuth({
    method: 'GET',
    url: `/user`,
    params: {
      start,
      limit,
      name,
      discordId,
    },
  })
}
