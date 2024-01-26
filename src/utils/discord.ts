import type { APIUser } from 'discord-api-types/v10'
import { get } from 'lodash-es'

export const discordUserAvatartUrl = (
  discordUser: APIUser | null | undefined,
) => {
  if (!discordUser) return ''
  const userId = get(discordUser, 'id')
  const avatarId = get(discordUser, 'avatar')
  return `https://cdn.discordapp.com/avatars/${userId}/${avatarId}.webp`
}
