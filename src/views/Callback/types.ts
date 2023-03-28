export type StageState = 'idle' | 'processing' | 'resolve' | 'error'

export type Stage = {
  name: string
  id: string
  state: StageState
}
