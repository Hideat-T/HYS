// 1. Die Styles laden (Tailwind)
import './assets/main.css' 

// 2. Die Werkzeuge von Vue laden
import { createApp } from 'vue'
import App from './App.vue'

// 3. Deine Zusatz-Module laden (Router und Sprachen)
import router from './router'
import i18n from './i18n' // Das ist dein neues Sprach-Wörterbuch

// 4. DIE APP ERSTELLEN (Nur ein einziges Mal!)
const app = createApp(App)

// 5. DIE MODULE AKTIVIEREN (Die "Zündschlüssel")
app.use(router) // Router einschalten
app.use(i18n)   // Sprachen einschalten

// 6. DIE APP ANZEIGEN (Ganz am Ende!)
app.mount('#app')