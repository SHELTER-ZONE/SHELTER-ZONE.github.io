import { api } from '@/lib/axios'

export const GetShelter = async ({
  name,
  discordId,
  start,
  limit = 10,
}: {
  start: number
  limit?: number
  name?: string
  discordId?: string
}) => {
  return await api({
    method: 'GET',
    url: `/website/shelter`,
    params: {
      start,
      limit,
      name,
      discordId,
    },
  })
}

export const GetShelterCount = async ({
  name,
  discordId,
}: {
  name?: string
  discordId?: string
}) => {
  return await api({
    method: 'GET',
    url: `/website/shelter/count`,
    params: {
      name,
      discordId,
    },
  })
}

export const FindShelter = async ({ discordId }: { discordId: string }) => {
  return await api({
    method: 'GET',
    url: `/website/shelter/${discordId}`,
  })
}

export const GetShelterByDiscordIds = async ({
  discordIds,
}: {
  discordIds: string[]
}) => {
  return await api({
    method: 'POST',
    url: `/website/shelter/byDiscordIds`,
    data: { discordIds },
  })
}
