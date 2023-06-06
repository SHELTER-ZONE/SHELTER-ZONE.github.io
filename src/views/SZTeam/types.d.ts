export type TeamBlockProps = {
  data: TeamData[]
}

export type TeamData = {
  name: string
  type: 'backend' | 'frontend' | 'bot'
  description: string
  techs: string[]
}
