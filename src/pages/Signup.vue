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
                                            v-model="signup.name"
                                            label="Name"
                                            :error="v$.signup.name.$dirty && v$.signup.name.$error">
                                            <template v-slot:error>
                                                <template v-if="v$.signup.name.required.$invalid">This field is required</template>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-12 q-mt-sm">
                                        <q-input filled
                                            v-model="signup.email"
                                            label="E-mail"
                                            :error="v$.signup.email.$dirty && v$.signup.email.$error"
                                            @update:model-value="resetEmailExistsFlag">
                                            <template v-slot:error>
                                                <template v-if="v$.signup.email.required.$invalid">This field is required</template>
                                                <template v-if="v$.signup.email.email.$invalid">This field must be a valid e-mail</template>
                                                <template v-if="v$.signup.email.alreadyExists.$invalid">This e-mail is associated to a registered account</template>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-12 q-mt-sm">
                                        <q-input filled
                                            v-model="signup.password"
                                            label="Password"
                                            type="password"
                                            :error="v$.signup.password.$dirty && v$.signup.password.$error">
                                            <template v-slot:error>
                                                <template v-if="v$.signup.password.required.$invalid">This field is required</template>
                                                <template v-else-if="v$.signup.password.minLengthValue.$invalid">This field must have at least 8 characters</template>
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
                                    @click="handleSignup">
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
import hasError from '@/classes/validators/hasError'
import SignupModel from '@/classes/models/Auth/Signup/SignupLogin'
import { useAuthStore } from '@/stores/auth/index'

const store$ = useAuthStore()
const signup = reactive(new SignupModel())
let repeat_password: Ref<string | null> = ref(null)

let loading: Ref<boolean> = ref(false)
let email_already_exists = ref(false)
let signup_successed = ref(false)

let handleSignup = async () => {
    v$.value.$touch();
    if (!v$.value.$error) {
        await store$.signup(signup).then(() => {
            loading.value = false
            signup_successed.value = true
        }).catch((thrown: Error) => {
            loading.value = false
            if (thrown.message == 'EmailAlreadyExistsException') {
                email_already_exists.value = true
            } else {
                //
            }
        })
    }
}

let resetEmailExistsFlag = () => {
    email_already_exists.value = false
}

// Validator
const rules = computed(() => {
    return {
        signup: {
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
            sameAsPassword: sameAs(signup.password)
        },
    }
})
const v$ = useVuelidate(rules, { signup, repeat_password })
</script>