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
                                    <div class="text-h5 q-mt-lg q-mb-lg text-center">Signup Form</div>
                                </div>
                                <div class="col-12 q-mt-lg">
                                    <q-input filled
                                        v-model="name"
                                        label="Name"
                                        :error="v$.name.$dirty && v$.name.$error">
                                        <template v-slot:error>
                                            <template v-if="v$.name.required.$invalid">This field is required</template>
                                        </template>
                                    </q-input>
                                </div>
                                <div class="col-12 q-mt-lg">
                                    <q-input filled
                                        v-model="email"
                                        label="Email"
                                        :error="v$.email.$dirty && v$.email.$error"
                                        :rules="[
                                            () => !v$.email.required.$invalid || 'This field is required',
                                        ]">
                                        <template v-slot:error>
                                            <template v-if="v$.email.required.$invalid">This field is required</template>
                                        </template>
                                    </q-input>
                                </div>
                                <div class="col-12 q-mt-lg">
                                    <q-input filled
                                        v-model="password"
                                        label="Password"
                                        type="password"
                                        :error="v$.password.$dirty && v$.password.$error">
                                        <template v-slot:error>
                                            <template v-if="v$.password.required.$invalid">This field is required</template>
                                            <template v-else-if="v$.password.minLengthValue.$invalid">This field must have at least 8 characters</template>
                                        </template>
                                    </q-input>
                                </div>
                                <div class="col-12 q-mt-lg">
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
            </div>
        </q-page-container>

        <Footer></Footer>

    </q-layout>
</template>

<script setup lang="ts">

import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import Footer from '@/components/layouts/Footer.vue'
import { required, sameAs, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

let name: Ref<string | null> = ref(null)
let email: Ref<string | null> = ref(null)
let password: Ref<string | null> = ref(null)
let repeat_password: Ref<string | null> = ref(null)

let loading: Ref<boolean> = ref(false)

let signup = () => {
    v$.value.$touch();
    if (!v$.value.$error) {
        loading.value = true
        window.api.get('/auth/signup').then((response: any) => {
            loading.value = false
        })
    } else {
        console.log("Error: ")
    }
}

// Validator
const rules = computed(() => {
    return {
        name: { required },
        email: { required },
        password: {
            required,
            minLengthValue: minLength(8)
        },
        repeat_password: {
            required,
            sameAsPassword: sameAs(password)
        },
    }
})
const v$ = useVuelidate(rules, { name, email, password, repeat_password })
</script>