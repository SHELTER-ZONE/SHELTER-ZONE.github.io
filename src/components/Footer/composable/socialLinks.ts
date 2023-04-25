import { ref } from 'vue'
import { LogoDiscord, LogoGithub } from '@vicons/carbon'

export const useSocialLinks = () => {
  const iconSize = ref(20)

  const links = [
    {
      name: 'Discord',
      href: 'https://discord.gg/D3MQjxzTgg',
      icon: LogoDiscord,
    },
    {
      name: 'Github',
      href: 'https://github.com/SHELTER-ZONE',
      icon: LogoGithub,
    },
  ]

  return { iconSize, links }
}
