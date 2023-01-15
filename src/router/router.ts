// @ts-nocheck
import Index from '@/pages/Index.vue'
import Login from '@/pages/Login.vue'
import Signup from '@/pages/Signup.vue'
import Forgot from '@/pages/Forgot.vue'

import Home from '@/pages/Home/Index.vue'

import Characters from '@/pages/Characters/Index.vue'
import Weapons from '@/pages/Weapons/Index.vue'
import Account from '@/pages/Account/Index.vue'
import Help from '@/pages/Help/Index.vue'

// Router
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/', component: Index, children: [
            { path: 'characters', name: 'characters', component: Characters },
            { path: 'weapons', name: 'weapons', component: Weapons },
            { path: 'account', name: 'account', component: Account },
            { path: 'help', name: 'help', component: Help },
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