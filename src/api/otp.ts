import { apiAuth } from './instance'

export const GenerateOTP = async (discordUserId: string) => {
  return await apiAuth({
    method: 'POST',
    url: `/otp`,
    data: {
      discordUserId,
      sourceTarget: 'official-website',
    },
  })
}

export const VerifyOTP = async ({ code }: { code: string }) => {
  return await apiAuth({
    method: 'POST',
    url: `/otp/verify`,
    data: {
      code,
      sourceTarget: 'official-website',
    },
  })
}
