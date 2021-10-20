import { createApp } from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'

import Equal from 'equal-vue'
import 'equal-vue/dist/style.css'

import App from './App.vue'

createApp(App)  
.use(VueAxios, axios)
.use(Equal) 
.mount('#app')

