// @ts-nocheck
import Index from '@/pages/Index.vue'
import Login from '@/pages/Login.vue'
import Signup from '@/pages/Signup.vue'
import Forgot from '@/pages/Forgot.vue'

import Home from '@/pages/Home/Index.vue'

import Characters from '@/pages/Characters/Index.vue'
import CharactersList from '@/pages/Characters/List.vue'
import CharactersForm from '@/pages/Characters/Form.vue'

import Weapons from '@/pages/Weapons/Index.vue'
import Account from '@/pages/Account/Index.vue'
import Help from '@/pages/Help/Index.vue'

// Router
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/', component: Index, children: [
            {
                path: 'characters', component: Characters, children: [
                    { path: ':id/edit', name: 'characters/edit', component: CharactersForm },
                    { path: 'create', name: 'characters/create', component: CharactersForm },
                    { path: '', name: 'characters', component: CharactersList },
                ]
            },
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
    history: createWebHashHistory(),
    routes,
})

export default router