import { api } from './instance'
import { RouteBases } from 'discord-api-types/v10'

export const FindMeDCUser = async ({
  accessToken,
}: {
  accessToken: string
}) => {
  console.log('accessToken', accessToken)
  return await api({
    method: 'GET',
    url: `${RouteBases.api}/users/@me`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
