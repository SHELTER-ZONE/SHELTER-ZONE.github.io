import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'virtual:windi.css'
import './assets/base.css'
import '@shelter-zone/shelter-ui/style'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
