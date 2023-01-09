<template>
    <q-layout view="hHh lpR fFf">

        <q-page-container>
            <div id="auth-form"
                class="row justify-center items-center">
                <template v-if="signup_successed">
                    <div class="col-xs-12 col-sm-8 col-md-4 col-lg-3">
                        <q-card class="my-card"
                            flat
                            bordered>
                            <q-card-section class="q-pt-xs">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="text-h5 q-mt-lg q-mb-lg text-center">Signup Successed</div>
                                    </div>
                                    <div class="col-12 q-mt-sm">
                                        Your account were registered successfully, try to login clicking in the button below.
                                    </div>
                                </div>
                            </q-card-section>

                            <q-separator />

                            <q-card-actions class="justify-end">
                                <q-btn flat
                                    color="primary"
                                    @click="$router.push({ name: 'login' })">
                                    Login
                                </q-btn>
                            </q-card-actions>
                        </q-card>
                    </div>
                </template>
                <template v-else>
                    <div class="col-xs-12 col-sm-8 col-md-4 col-lg-3">
                        <q-card class="my-card"
                            flat
                            bordered>
                            <q-card-section class="q-pt-xs">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="text-h5 q-mt-lg q-mb-lg text-center">Signup Form</div>
                                    </div>
                                    <div class="col-12 q-mt-sm">
                                        <q-input filled
                                            v-model="user.name"
                                            label="Name"
                                            :error="v$.user.name.$dirty && v$.user.name.$error">
                                            <template v-slot:error>
                                                <template v-if="v$.user.name.required.$invalid">This field is required</template>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-12 q-mt-sm">
                                        <q-input filled
                                            v-model="user.email"
                                            label="E-mail"
                                            :error="v$.user.email.$dirty && v$.user.email.$error"
                                            @update:model-value="resetEmailExistsFlag">
                                            <template v-slot:error>
                                                <template v-if="v$.user.email.required.$invalid">This field is required</template>
                                                <template v-if="v$.user.email.email.$invalid">This field must be a valid e-mail</template>
                                                <template v-if="v$.user.email.alreadyExists.$invalid">This e-mail is associated to a registered account</template>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-12 q-mt-sm">
                                        <q-input filled
                                            v-model="user.password"
                                            label="Password"
                                            type="password"
                                            :error="v$.user.password.$dirty && v$.user.password.$error">
                                            <template v-slot:error>
                                                <template v-if="v$.user.password.required.$invalid">This field is required</template>
                                                <template v-else-if="v$.user.password.minLengthValue.$invalid">This field must have at least 8 characters</template>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-12 q-mt-sm">
                                        <q-input filled
                                            v-model="repeat_password"
                                            label="Repeat Password"
                                            type="password"
                                            :error="v$.repeat_password.$dirty && v$.repeat_password.$error">
                                            <template v-slot:error>
                                                <template v-if="v$.repeat_password.required.$invalid">This field is required</template>
                                                <template v-else-if="v$.repeat_password.sameAsPassword.$invalid">This field most be equal to password field</template>
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
                                    @click="$router.push({ name: 'login' })">
                                    Already have an account
                                </q-btn>
                                <q-btn flat
                                    color="primary"
                                    @click="signup">
                                    Signup
                                </q-btn>
                            </q-card-actions>
                        </q-card>
                    </div>
                </template>
            </div>
        </q-page-container>

        <Footer></Footer>

    </q-layout>
</template>

<script setup lang="ts">

import { ref, reactive, computed, onBeforeMount } from 'vue'
import type { Ref } from 'vue'
import Footer from '@/components/layouts/Footer.vue'
import { required, sameAs, minLength, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import User from '@/classes/models/User'
import axios from 'axios'
import hasError from '@/classes/validators/hasError'

let user: User = reactive(new User())
let repeat_password: Ref<string | null> = ref(null)

let loading: Ref<boolean> = ref(false)
let email_already_exists = ref(false)
let signup_successed = ref(false)

let signup = () => {
    v$.value.$touch();
    if (!v$.value.$error) {
        window.api.post('/auth/signup', user).then((response: any) => {
            loading.value = false
            signup_successed.value = true
        }).catch((thrown: any) => {
            if (axios.isAxiosError(thrown)) {
                if (thrown.response?.data?.exception == 'App\\Exceptions\\API\\App\\Auth\\Signup\\EmailAlreadyExistsException') {
                    email_already_exists.value = true
                    console.log('Error: ', thrown.response.data)
                }
            }
            loading.value = false
        })
    }
}

let resetEmailExistsFlag = () => {
    email_already_exists.value = false
}

// Validator
const rules = computed(() => {
    return {
        user: {
            name: { required },
            email: {
                required,
                email,
                alreadyExists: hasError(email_already_exists.value)
            },
            password: {
                required,
                minLengthValue: minLength(8)
            },
        },
        repeat_password: {
            required,
            sameAsPassword: sameAs(user.password)
        },
    }
})
const v$ = useVuelidate(rules, { user, repeat_password })
</script>