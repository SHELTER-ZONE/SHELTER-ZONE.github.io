import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createHead } from '@unhead/vue'

import App from './App.vue'
import router from './router'
import messages from './locale'
import { createDiscreteApi, darkTheme } from 'naive-ui'

const { message: $message } = createDiscreteApi(['message'], {
  configProviderProps: { theme: darkTheme },
})

window.$message = $message

import 'virtual:windi.css'
import './assets/base.css'
import '@/styles/index.css'
import '@shelter-zone/shelter-ui/style'

const i18n = createI18n({
  legacy: false,
  locale: 'tw', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages,
})

const app = createApp(App)

const head = createHead()

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(head)

app.mount('#app')
