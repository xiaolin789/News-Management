import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from 'particles.vue3'
import '@/utils/axios.config'
import VueDOMPurifyHTML from 'vue-dompurify-html'



createApp(App)
.use(Particles)
.use(store)
.use(router)
.use(ElementPlus)
.use(VueDOMPurifyHTML)
.mount('#app')

