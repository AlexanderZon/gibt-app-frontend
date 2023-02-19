<template>
    <q-page padding>
        <div class="q-pa-md">
            <div class="q-col-gutter-md row">
                <div class="col-md-12">
                    <q-list bordered
                        class="rounded-borders">
                        <q-item-label header>User Info</q-item-label>

                        <q-item>

                            <q-item-section top
                                class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm">Name </q-item-label>
                            </q-item-section>

                            <q-item-section top>
                                <q-item-label class="q-mt-sm">{{ user.name }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>

                            <q-item-section top
                                class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm">Email </q-item-label>
                            </q-item-section>

                            <q-item-section top>
                                <q-item-label class="q-mt-sm">{{ user.email }}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item-label header>Account List</q-item-label>

                        <q-item v-for="(account, index) in accounts">
                            <q-item-section top
                                class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm">{{ account.title }}</q-item-label>
                            </q-item-section>

                            <q-item-section top>
                                <q-item-label class="q-mt-sm"><span class="text-weight-medium">Servidor: {{ account.game_server }}</span></q-item-label>

                                <q-item-label caption
                                    lines="1">
                                    Characters: {{ account.account_characters.length }}
                                </q-item-label>
                                <q-item-label caption
                                    lines="1">
                                    Weapons: {{ account.account_weapons.length }}
                                </q-item-label>
                            </q-item-section>

                            <q-item-section top
                                side>
                                <div class="text-grey-8 q-gutter-xs">
                                    <q-btn v-if="account.is_active"
                                        class="gt-xs"
                                        color="green"
                                        size="12px"
                                        flat
                                        dense
                                        round
                                        icon="done" />
                                    <q-btn v-else
                                        @click="setActiveAccount(account)"
                                        class="gt-xs"
                                        size="12px"
                                        flat
                                        dense
                                        round
                                        icon="done" />
                                    <q-btn size="12px"
                                        flat
                                        dense
                                        round
                                        icon="more_vert" />
                                </div>
                            </q-item-section>
                        </q-item>

                        <q-item clickable
                            v-ripple
                            @click="showNewAccountFormDialog">
                            <q-item-section top
                                class="col-2 gt-sm">
                                <q-item-label class="q-mt-sm">Add new Account
                                    <q-icon name="mdi-plus"
                                        color="black"
                                        size="20px" /></q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </div>
        </div>
        <q-dialog v-model="new_account_dialog">
            <q-card>
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Account Form</div>
                    <q-space />
                    <q-btn icon="close"
                        flat
                        round
                        dense
                        v-close-popup />
                </q-card-section>

                <q-card-section>
                    <div class="q-pa-md">
                        <div class="q-col-gutter-md row">
                            <div class="col-md-12">
                                <q-input outlined
                                    v-model="new_account.title"
                                    label="Title" />
                            </div>
                            <div class="col-md-12">
                                <q-select outlined
                                    v-model="new_account.game_server"
                                    :options="game_server_options"
                                    label="Server" />
                            </div>
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat
                        label="Cancel"
                        color="primary"
                        v-close-popup />
                    <q-btn flat
                        label="Save"
                        color="primary"
                        @click="storeNewAccount" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useSettingsStore } from '@/stores/settings/index'
import { useRouter } from 'vue-router'
import AccountModel from '@/classes/models/Account/AccountModel';

const store$ = useSettingsStore()
const router = useRouter()

let loading = ref(false)

let accounts = computed(() => {
    return store$.accounts
})
let user = computed(() => {
    return store$.user
})

let game_server_options = ['NA', 'EU', 'AS', 'TW']
let new_account = reactive(AccountModel.blank())
let new_account_dialog = ref(false)
let showNewAccountFormDialog = () => {
    new_account_dialog.value = true
}
let closeNewAccountFormDialog = () => {
    new_account_dialog.value = false
}
let storeNewAccount = async () => {
    closeNewAccountFormDialog()
    await store$.storeAccount(new_account)
}
let setActiveAccount = async (account: AccountModel) => {
    await store$.setActiveAccount(account)
}

onBeforeMount(async () => {
    await store$.get()
})
</script>