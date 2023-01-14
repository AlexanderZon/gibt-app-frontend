<template>
    <q-layout view="lHh lpR lFf">
        <template v-if="!loading">
            <q-header elevated
                class="bg-primary text-white">
                <q-toolbar>
                    <q-btn dense
                        flat
                        round
                        icon="menu"
                        @click="toggleLeftDrawer" />

                    <q-toolbar-title>
                        <q-avatar>
                            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
                        </q-avatar>
                        Title
                    </q-toolbar-title>
                </q-toolbar>
            </q-header>

            <q-drawer v-model="leftDrawerOpen"
                side="left"
                behavior="default"
                elevated>
                <q-scroll-area class="fit"
                    style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
                    <q-list>
                        <template v-for="(menuItem, index) in menuList"
                            :key="index">
                            <q-item clickable
                                :active="menuItem.label === 'Outbox'"
                                v-ripple>
                                <q-item-section avatar>
                                    <q-icon :name="menuItem.icon" />
                                </q-item-section>
                                <q-item-section>
                                    {{ menuItem.label }}
                                </q-item-section>
                            </q-item>
                            <q-separator :key="'sep' + index"
                                v-if="menuItem.separator" />
                        </template>
                        <q-item clickable
                            @click="logout"
                            v-ripple>
                            <q-item-section avatar>
                                <q-icon name="logout" />
                            </q-item-section>
                            <q-item-section>
                                Logout
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-scroll-area>
                <q-img class="absolute-top"
                    src="https://cdn.quasar.dev/img/material.png"
                    style="height: 150px">
                    <div class="absolute-bottom bg-transparent">
                        <q-avatar size="56px"
                            class="q-mb-sm">
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                        </q-avatar>
                        <div class="text-weight-bold">{{ user.name }}</div>
                        <div>{{ user.email }}</div>
                    </div>
                </q-img>
            </q-drawer>

            <!-- <q-drawer show-if-above
                v-model="rightDrawerOpen"
                side="right"
                bordered>
            </q-drawer> -->

            <q-page-container>
                <router-view />
            </q-page-container>

            <Footer></Footer>
        </template>
    </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, reactive } from 'vue'
import type { Ref } from 'vue'
import auth from '@/packages/auth'
import { AxiosError, AxiosResponse } from 'axios';
import { AppAuthCheckResponseInterface } from '@/classes/interfaces/Auth/Auth';
import { useRouter } from 'vue-router';
import Footer from '@/components/layouts/Footer.vue'
import UserInterface from '@/classes/models/User/UserInterface';

const leftDrawerOpen = ref(true)
const rightDrawerOpen = ref(false)
let user: UserInterface

const menuList = [
    {
        icon: 'mdi-view-dashboard-variant',
        label: 'Dashboard',
        separator: true
    },
    {
        icon: 'send',
        label: 'My Characters',
        separator: false
    },
    {
        icon: 'delete',
        label: 'My Weapons',
        separator: false
    },
    {
        icon: 'help',
        iconColor: 'primary',
        label: 'Help',
        separator: false
    }
]

let toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

let toggleRightDrawer = () => {
    rightDrawerOpen.value = !rightDrawerOpen.value
}

const router = useRouter()
let loading: Ref<boolean> = ref(true)

let goLogin = () => {
    router.push({ name: 'login' })
}

let logout = () => {
    auth.logout().then((response: AxiosResponse) => {
        goLogin()
    }).catch((thrown: AxiosError) => {
        //
    })
}


onBeforeMount(async () => {
    await auth.csrf().then((response: AxiosResponse) => {
        //
    }).catch((thrown: AxiosError) => {
        //
    })
    auth.check().then((response: AxiosResponse) => {
        let response_data: AppAuthCheckResponseInterface = response.data
        if (response_data.user == null) {
            goLogin()
        } else {
            user = response_data.user
            loading.value = false
        }
    }).catch((thrown: AxiosError) => {
        //
    })
})
</script>