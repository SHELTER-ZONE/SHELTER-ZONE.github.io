import { api, apiAuth } from '@/lib/axios'

export const sendJoinSZTeamForm = async ({
  discordId,
  joinTeam,
  content,
}: {
  discordId: string
  joinTeam: string
  content: string
}) => {
  return await apiAuth({
    method: 'POST',
    url: `/website/joinSZTeamForm`,
    data: {
      discordId,
      joinTeam,
      content,
    },
  })
}
