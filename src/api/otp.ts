import { apiAuth } from './instance'

export const GenerateOTP = async ({
  sourceTarget,
}: {
  sourceTarget: string
}) => {
  return await apiAuth({
    method: 'POST',
    url: `/otp`,
    data: {
      sourceTarget,
    },
  })
}

export const VerifyOTP = async ({
  code,
  sourceTarget,
}: {
  code: string
  sourceTarget: string
}) => {
  return await apiAuth({
    method: 'POST',
    url: `/otp/verify`,
    data: {
      code,
      sourceTarget,
    },
  })
}
