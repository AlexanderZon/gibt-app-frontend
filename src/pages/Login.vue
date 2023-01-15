<template>
    <q-layout view="hHh lpR fFf">
        <template v-if="!loading">
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
                                    <div class="col-12"
                                        v-if="bad_credentials">
                                        <div class="text-negative">Wrong email or password</div>
                                    </div>
                                    <div class="col-12"
                                        v-if="server_error">
                                        <div class="text-negative">Server Error</div>
                                    </div>
                                    <div class="col-12 q-mt-lg">
                                        <q-input filled
                                            v-model="login.email"
                                            label="Email"
                                            :error="v$.login.email.$dirty && v$.login.email.$error">
                                            <template v-slot:error>
                                                <template v-if="v$.login.email.required.$invalid">This field is required</template>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-12 q-mt-lg">
                                        <q-input filled
                                            v-model="login.password"
                                            label="Password"
                                            type="password"
                                            :error="v$.login.password.$dirty && v$.login.password.$error">
                                            <template v-slot:error>
                                                <template v-if="v$.login.password.required.$invalid">This field is required</template>
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
                                    :loading="login_loading"
                                    @click="handleLogin">
                                    Login
                                </q-btn>
                            </q-card-actions>
                        </q-card>
                    </div>
                </div>
            </q-page-container>

            <Footer></Footer>
        </template>

    </q-layout>
</template>

<script setup lang="ts">

import { ref, computed, onBeforeMount, reactive } from 'vue'
import type { Ref } from 'vue'
import { required, sameAs, minLength, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Footer from '@/components/layouts/Footer.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/index'
import LoginModel from '@/classes/models/Auth/Login/LoginModel'

const store$ = useAuthStore()
const login = reactive(new LoginModel())

const router = useRouter()
let loading: Ref<boolean> = ref(true)
let login_loading: Ref<boolean> = ref(false)
let bad_credentials: Ref<boolean> = ref(false)
let server_error: Ref<boolean> = ref(false)

let goHome = () => {
    router.push({ name: 'home' })
}

let handleLogin = async () => {
    v$.value.$touch();
    if (!v$.value.$error) {
        login_loading.value = true
        await store$.login(login).catch((thrown: Error) => {
            login_loading.value = false
            if (thrown.message == 'Unauthorized') {
                bad_credentials.value = true
            } else {
                server_error.value = true
            }
        })
        await store$.check()
        if (user.value != null) {
            goHome()
        } else {
            login_loading.value = false
        }
    }
}

// Validator
const rules = computed(() => {
    return {
        login: {
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
const v$ = useVuelidate(rules, { login })

let user = computed(() => {
    return store$.user
})

onBeforeMount(async () => {
    login.email = 'amontenegro.sistemas@gmail.com'
    login.password = 'q1w2e3r4t5.'
    await store$.csrf()
    await store$.check()
    if (user.value != null) {
        goHome()
    } else {
        loading.value = false
    }
})
</script>