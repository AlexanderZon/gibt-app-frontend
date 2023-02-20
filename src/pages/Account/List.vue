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

                        <template v-for="(account, index) in accounts">
                            <AccountListItem :account="account"></AccountListItem>
                        </template>

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
        <AccountFormDialog v-if="new_account_dialog"
            @close="closeNewAccountFormDialog"
            :account="new_account"></AccountFormDialog>
    </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useSettingsStore } from '@/stores/settings/index'
import { useRouter } from 'vue-router'
import AccountModel from '@/classes/models/Account/AccountModel';
import AccountListItem from './List/AccountListItem.vue';
import AccountFormDialog from './List/AccountFormDialog.vue';

const store$ = useSettingsStore()
const router = useRouter()

let loading = ref(false)

let accounts = computed(() => {
    return store$.accounts
})
let user = computed(() => {
    return store$.user
})

let new_account = reactive(AccountModel.blank())
let new_account_dialog = ref(false)
let showNewAccountFormDialog = () => {
    new_account_dialog.value = true
}
let closeNewAccountFormDialog = () => {
    new_account_dialog.value = false
}

onBeforeMount(async () => {
    await store$.get()
})
</script>