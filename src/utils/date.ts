import dayjs from 'dayjs'

export const dateFormat = (
  date: Date | string,
  format: string = 'YYYY/MM/DD HH:mm:ss',
) => {
  if (!date) return null
  return dayjs(date).format(format)
}
