import { MessageApi } from 'naive-ui'

export {}

declare global {
  interface Window {
    $message: MessageApi
  }
}
