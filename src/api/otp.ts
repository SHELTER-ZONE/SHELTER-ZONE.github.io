import { apiAuth } from './instance'

export const GenerateOTP = async () => {
  return await apiAuth({
    method: 'POST',
    url: `/otp`,
    data: {
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
