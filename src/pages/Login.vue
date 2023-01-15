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
                                    @click="login">
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
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { AppAuthCheckResponseInterface } from '@/classes/interfaces/Auth/Auth'
import auth from '@/packages/auth'

const user = reactive(new auth.Login())

const router = useRouter()
let loading: Ref<boolean> = ref(true)
let login_loading: Ref<boolean> = ref(false)

let goHome = () => {
    router.push({ name: 'home' })
}

let login = () => {
    v$.value.$touch();
    if (!v$.value.$error) {
        login_loading.value = true
        auth.login(user).then((response: AxiosResponse) => {
            goHome()
        }).catch((thrown: AxiosError) => {
            login_loading.value = false
        })
    }
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
onBeforeMount(async () => {
    await auth.csrf().then((response: AxiosResponse) => {
        //
    }).catch((thrown: AxiosError) => {
        //
    })
    auth.check().then((response: AxiosResponse) => {
        let response_data: AppAuthCheckResponseInterface = response.data.user
        if (response_data != null) {
            goHome()
        } else {
            loading.value = false
        }
    }).catch((thrown: AxiosError) => {
        //
    })
})
</script>