import { szBackend } from '@/lib/axios'

/**
 * Check if a Discord user has joined the server
 * GET /discord/check-member/{discordId}
 *
 * Response shape:
 * {
 *   message?: string,
 *   errorCode?: string,
 *   data: { isJoined: boolean }
 * }
 */
export const CheckDiscordMember = async (discordId: string) => {
  return await szBackend({
    method: 'GET',
    url: `/discord/check-member/${discordId}`,
  })
}

export default CheckDiscordMember
