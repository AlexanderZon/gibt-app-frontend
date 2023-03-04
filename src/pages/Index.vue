<template>
    <div>
        <q-layout view="lHh Lpr lff"
            container
            style="height: 100vh;"
            class="shadow-2 rounded-borders">
            <template v-if="!loading && user != null">
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
                                <img :src="logo">
                            </q-avatar>
                            {{ title }}
                        </q-toolbar-title>
                    </q-toolbar>
                </q-header>

                <q-drawer v-model="leftDrawerOpen"
                    side="left"
                    behavior="default"
                    elevated
                    style="height: calc(100vh - 220px); margin-top: 150px; border-right: 1px solid #ddd">
                    <q-scroll-area class="fit">
                        <q-list>
                            <template v-for="(menuItem, index) in menuList"
                                :key="index">
                                <q-item clickable
                                    :active="menuItem.label === 'Outbox'"
                                    router
                                    :to="menuItem.to"
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

                <q-page-container>
                    <router-view></router-view>
                </q-page-container>

                <Footer></Footer>
            </template>
        </q-layout>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount, reactive } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router';
import Footer from '@/components/layouts/Footer.vue'
import { useAuthStore } from '@/stores/auth/index'
const logo = new URL('@/assets/logo.png', import.meta.url).href

const $store = useAuthStore()

const leftDrawerOpen = ref(true)

const menuList = [
    {
        icon: 'mdi-view-dashboard-variant',
        label: 'Home',
        to: { name: 'home' },
        separator: true
    },
    {
        icon: 'mdi-account-heart',
        label: 'My Characters',
        to: { name: 'characters' },
        separator: false
    },
    {
        icon: 'mdi-sword',
        label: 'My Weapons',
        to: { name: 'weapons' },
        separator: false
    },
    {
        icon: 'mdi-account-circle',
        iconColor: 'primary',
        label: 'Account',
        to: { name: 'account' },
        separator: false
    },
]

let toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const $router = useRouter()
let loading: Ref<boolean> = ref(true)

let goLogin = () => {
    $router.push({ name: 'login' })
}

let logout = async () => {
    await $store.logout()
    goLogin()
}

let user = computed(() => {
    return $store.user
})

let title = computed(() => {
    switch ($router.currentRoute.value.name) {
        case 'characters/edit':
        case 'characters/create':
        case 'characters':
            return `My Characters`
        case 'weapons/edit':
        case 'weapons/create':
        case 'weapons':
            return `My Weapons`
        case 'home':
            return `Home`
        case 'account':
            return `Account`
        case 'help':
            return `Help`
    }
})

onBeforeMount(async () => {
    await $store.csrf()
    await $store.check()

    if (user.value == null) {
        goLogin()
    } else {
        loading.value = false
    }
})
</script>

<style lang="sass">
.scroll 
    margin-top: 50px
    height: calc(100vh - 100px)
.q-drawer-container
    .scroll 
        margin-top: 0px
.q-page-container
    padding-top: 0 !important
    padding-bottom: 0 !important

</style>