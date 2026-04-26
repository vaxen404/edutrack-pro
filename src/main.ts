import { createApp } from 'vue'
import { createPinia } from 'pinia' // Pinia'yı dahil ediyoruz
import App from './App.vue'
import router from './router' // Router'ı dahil ediyoruz

// 1. Uygulama örneğini oluştur
const app = createApp(App)

// 2. Pinia (Store) sistemini uygulamaya tak
const pinia = createPinia()
app.use(pinia)

// 3. Router (Sayfalar) sistemini uygulamaya tak
app.use(router)

// 4. Uygulamayı index.html içindeki #app id'li yere bağla
app.mount('#app')