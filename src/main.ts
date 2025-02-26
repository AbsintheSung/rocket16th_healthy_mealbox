import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { getFontAwesome } from '@/utils/font-awesome/getAwesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//取得 awesome 圖標樣式
getFontAwesome();

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')

