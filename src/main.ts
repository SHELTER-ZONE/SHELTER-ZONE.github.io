import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router, { setupRouter } from './router'
import 'virtual:uno.css'
import '@unocss/reset/eric-meyer.css'
import '@proladon/shelter-ui/dist/index.css'
import './styles/main.css'

const app = createApp(App)

setupRouter(app)

app.use(createPinia())
app.use(router)
app.mount('#app')
