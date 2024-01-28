import { createApp } from 'vue'
import './app.scss'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
const app = createApp(App).use(VueAxios, axios)
app.mount('#app')


