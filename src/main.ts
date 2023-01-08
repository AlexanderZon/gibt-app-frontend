// FILE: main.js

import { createApp } from 'vue'

const app = createApp({})

// Router
import router from '@/router/router'
app.use(router)

// Pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)

import axios from 'axios'
declare global {
  interface Window {
    api: any;
  }
}
window.api = axios.create({
  baseURL: `http://localhost:8000/api/app`,
});

import { registerPlugins } from '@/plugins'
registerPlugins(app)

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app')
