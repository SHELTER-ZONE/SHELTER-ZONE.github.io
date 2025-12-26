import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router, { setupRouter } from './router'
import 'virtual:uno.css'

const app = createApp(App)

setupRouter(app)

app.use(createPinia())
app.use(router)
app.mount('#app')
