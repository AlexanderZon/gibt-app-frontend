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
import WeaponsList from '@/pages/Weapons/List.vue'
import WeaponsForm from '@/pages/Weapons/Form.vue'

import Account from '@/pages/Account/Index.vue'
import AccountList from '@/pages/Account/List.vue'

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
            {
                path: 'weapons', component: Weapons, children: [
                    { path: ':id/edit', name: 'weapons/edit', component: WeaponsForm },
                    { path: 'create', name: 'weapons/create', component: WeaponsForm },
                    { path: '', name: 'weapons', component: WeaponsList },
                ]
            },
            {
                path: 'account', component: Account, children: [
                    { path: '', name: 'account', component: AccountList },
                ]
            },
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