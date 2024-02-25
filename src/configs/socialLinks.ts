import { LogoGithub, LogoInstagram, LogoYoutube, Link } from '@vicons/carbon'

export const socialLinkTypeIconConfigs = {
  github: LogoGithub,
  instagram: LogoInstagram,
  youtube: LogoYoutube,
  custom: Link,
}

export const socialLinksTypesConfig = [
  'github',
  'instagram',
  'youtube',
  'custom',
]

export const socialLinkTemplateConfigs = {
  github: { prefix: 'https://github.com/' },
  instagram: { prefix: 'https://www.instagram.com/' },
  youtube: { prefix: 'https://www.youtube.com/c/' },
}
