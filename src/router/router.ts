// @ts-nocheck
import Index from '@/pages/Index.vue'
import Login from '@/pages/Login.vue'
import Signup from '@/pages/Signup.vue'
import Forgot from '@/pages/Forgot.vue'

import Home from '@/pages/Home/Index.vue'

// Router
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/', component: Index, children: [
            { path: '', name: 'home', component: Home },
        ]
    },
    { path: '/login', name: 'login', component: Login },
    { path: '/signup', name: 'signup', component: Signup },
    { path: '/forgot', name: 'forgot', component: Forgot },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router