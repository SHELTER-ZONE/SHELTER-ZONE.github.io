export const githubUrlRegex = (val: string) =>
  /^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/.test(val)
export const instagramUrlRegex = (val: string) =>
  /^https:\/\/www\.instagram\.com\/[a-zA-Z0-9._]+$/.test(val)
export const youtubeChannelUrlRegex = (val: string) =>
  /^https:\/\/www\.youtube\.com\/(c|channel)\/[a-zA-Z0-9_-]+$/.test(val)

export const urlRegex = (val: string) =>
  /(((http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?/.test(
    val,
  )
