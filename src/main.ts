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
axios.defaults.withCredentials = true;
window.api = axios.create({
  baseURL: `http://api.gibt.docker.internal/`,
});

import { registerPlugins } from '@/plugins'
registerPlugins(app)

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app')
