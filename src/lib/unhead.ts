import { useSeoMeta } from '@unhead/vue'
import { get } from 'lodash-es'

export type FormatSeoMetaParams = {
  title: string
  description: string
  image?: string | undefined
}

export const useFormatSeoMeta = ({
  title,
  description,
  image,
}: FormatSeoMetaParams) => {
  useSeoMeta({
    title: `SHELTER ZONE | ${title}`,
    ogTitle: `SHELTER ZONE | ${title}`,
    description: description,
    ogDescription: description,
    ogImage: image,
  })
}
