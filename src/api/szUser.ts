import { api } from './instance'

export const GetSZUser = async (discordId: string) => {
  return await api({
    method: 'GET',
    url: `/user/${discordId}`,
  })
}
