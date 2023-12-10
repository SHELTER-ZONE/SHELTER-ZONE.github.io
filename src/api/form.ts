import { api, apiAuth } from './instance'

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
