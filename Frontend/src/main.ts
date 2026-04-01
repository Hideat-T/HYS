// 1. Zuerst die CSS-Datei laden (WICHTIG!)
import './assets/main.css'

// 2. Vue und deine Module laden
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

// 3. Die App erstellen und starten
const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')