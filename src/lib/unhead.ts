import { useHead } from '@unhead/vue'

export const initUnhead = () => {
  useHead({
    titleTemplate: (title?: string) => `SHELTER ZONE | ${title}`,
  })
}
