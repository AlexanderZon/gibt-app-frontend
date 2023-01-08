<template>
    <q-layout view="hHh lpR fFf">

        <q-page-container>
            <div id="auth-form" class="row justify-center items-center">
                <div class="col-xs-12 col-sm-8 col-md-4 col-lg-3">
                    <q-card class="my-card" flat bordered>
                        <q-card-section class="q-pt-xs">
                            <div class="row">
                                <div class="col-12">
                                    <div class="text-h5 q-mt-lg q-mb-lg text-center">Login Form</div>
                                </div>
                                <div class="col-12 q-mt-lg">
                                    <q-input filled v-model="email" label="Email" />
                                </div>
                                <div class="col-12 q-mt-lg">
                                    <q-input filled v-model="password" label="Password" type="password" />
                                </div>
                            </div>
                        </q-card-section>

                        <q-separator />

                        <q-card-actions class="justify-end">
                            <q-btn size="sm" flat color="secondary" @click="$router.push({ name: 'forgot' })">
                                Forgot my password
                            </q-btn>
                            <q-btn size="sm" flat color="secondary" @click="$router.push({ name: 'signup' })">
                                Do not have and account?
                            </q-btn>
                            <q-btn flat color="primary" @click="login">
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

import { ref } from 'vue'
import type { Ref } from 'vue'
import Footer from '@/components/layouts/Footer.vue'

let email: Ref<string | null> = ref(null)
let password: Ref<string | null> = ref(null)

let login = () => {

}
</script>