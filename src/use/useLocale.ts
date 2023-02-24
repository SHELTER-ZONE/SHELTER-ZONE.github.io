import { useI18n } from 'vue-i18n'
import { get } from 'lodash-es'

export type Locale = 'en' | 'tw'
export type LocaleOptions = {}
export const useLocale = () => {
  const { messages, locale } = useI18n()

  const translate = (path: string, defaultString: string = '') => {
    const localeMessages = messages.value?.[locale.value]

    return get(localeMessages, path, defaultString)
  }

  const changeLocale = (newLocale: Locale): void => {
    locale.value = newLocale
  }

  const localeOptions = {
    en: { label: 'English', value: 'en' },
    tw: { label: '繁體中文', value: 'tw' },
  }

  return {
    translate,
    messages,
    locale,
    changeLocale,
    localeOptions,
  }
}
