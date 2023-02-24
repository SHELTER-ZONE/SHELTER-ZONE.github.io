import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import messages from './locale'

import 'virtual:windi.css'
import './assets/base.css'
import '@shelter-zone/shelter-ui/style'

const i18n = createI18n({
  legacy: false,
  locale: 'tw', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
