import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/scss/bootstrap.scss'
import { createPinia } from 'pinia'
import {LoadingPlugin} from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(LoadingPlugin)
app.mount('#app')
