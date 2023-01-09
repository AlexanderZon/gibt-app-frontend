<template>
    <q-layout view="hHh lpR fFf">

        <q-page-container>
            <div id="auth-form"
                class="row justify-center items-center">
                <div class="col-xs-12 col-sm-8 col-md-4 col-lg-3">
                    <q-card class="my-card"
                        flat
                        bordered>
                        <q-card-section class="q-pt-xs">
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-h5 q-mt-lg q-mb-lg text-center">Login Form</div>
                                </div>
                                <div class="col-12 q-mt-lg">
                                    <q-input filled
                                        v-model="user.email"
                                        label="Email"
                                        :error="v$.user.email.$dirty && v$.user.email.$error">
                                        <template v-slot:error>
                                            <template v-if="v$.user.email.required.$invalid">This field is required</template>
                                        </template>
                                    </q-input>
                                </div>
                                <div class="col-12 q-mt-lg">
                                    <q-input filled
                                        v-model="user.password"
                                        label="Password"
                                        type="password"
                                        :error="v$.user.password.$dirty && v$.user.password.$error">
                                        <template v-slot:error>
                                            <template v-if="v$.user.password.required.$invalid">This field is required</template>
                                        </template>
                                    </q-input>
                                </div>
                            </div>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions class="justify-end">
                            <q-btn size="sm"
                                flat
                                color="secondary"
                                @click="logout">
                                logout
                            </q-btn>
                            <q-btn size="sm"
                                flat
                                color="secondary"
                                @click="test">
                                test
                            </q-btn>
                            <q-btn size="sm"
                                flat
                                color="secondary"
                                @click="$router.push({ name: 'forgot' })">
                                Forgot my password
                            </q-btn>
                            <q-btn size="sm"
                                flat
                                color="secondary"
                                @click="$router.push({ name: 'signup' })">
                                Do not have and account?
                            </q-btn>
                            <q-btn flat
                                color="primary"
                                @click="login">
                                Login
                            </q-btn>
                        </q-card-actions>
                    </q-card>
                </div>
            </div>
        </q-page-container>

        <Footer></Footer>

    </q-layout>
</template>

<script setup lang="ts">

import { ref, computed, onBeforeMount, reactive } from 'vue'
import type { Ref } from 'vue'
import { required, sameAs, minLength, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Footer from '@/components/layouts/Footer.vue'
import axios from 'axios'
import User from '@/classes/models/User'

class Login {
    email: string
    password: string
}

const user = reactive(new Login())
let loading: Ref<boolean> = ref(false)

let login = () => {
    v$.value.$touch();
    if (!v$.value.$error) {
        window.api.post('/api/app/auth/login', user).then((response: any) => {
            loading.value = false
        }).catch((thrown: any) => {
            if (axios.isAxiosError(thrown)) {
                //
            }
            loading.value = false
        })
    }
}

let logout = () => {
    window.api.post('/api/app/auth/logout').then((response: any) => {
        loading.value = false
    }).catch((thrown: any) => {
        if (axios.isAxiosError(thrown)) {
            //
        }
        loading.value = false
    })
}

let test = async () => {
    await window.api.get('/api/app/users').then((response: any) => {
        loading.value = false
    }).catch((thrown: any) => {
        if (axios.isAxiosError(thrown)) {
            //
        }
        loading.value = false
    })
}

// Validator
const rules = computed(() => {
    return {
        user: {
            email: {
                required,
                email,
            },
            password: {
                required,
            },
        }
    }
})
const v$ = useVuelidate(rules, { user })
onBeforeMount(() => {
    window.api.get('/sanctum/csrf-cookie').then((response: any) => {
        loading.value = false
        console.log("getting cookie ok")
    }).catch((thrown: any) => {
        if (axios.isAxiosError(thrown)) {
            console.log("getting cookie error")
        }
        loading.value = false
    })
})
</script>