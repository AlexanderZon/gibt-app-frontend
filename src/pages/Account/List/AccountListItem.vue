<template>
    <div>

        <q-item>
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
                        icon="more_vert">
                        <q-menu dense
                            max-height="100px">
                            <q-list style="min-width: 100px">
                                <q-item clickable
                                    v-close-popup
                                    @click="showEditDialog">
                                    <q-item-section>Edit</q-item-section>
                                </q-item>
                                <q-item clickable
                                    v-close-popup
                                    class="text-negative"
                                    @click="showDeleteDialog">
                                    <q-item-section>Delete</q-item-section>
                                </q-item>
                            </q-list>
                        </q-menu>
                    </q-btn>
                </div>
            </q-item-section>
        </q-item>
        <AccountFormDialog v-if="edit_account_dialog"
            @close="closeEditDialog"
            :account="account"></AccountFormDialog>
        <ConfirmDialog v-if="delete_account_dialog"
            @confirm="confirmDelete"
            @close="closeDeleteDialog"
            cancel-text="No, Close"
            confirm-text="Yes, Delete"
            confirm-color="negative">
            <template v-slot:title>
                Delete Account
            </template>
            <template v-slot:content>
                Are you sure to delete this account?
            </template>
        </ConfirmDialog>
    </div>
</template>

<script setup lang="ts">
import AccountModel from '@/classes/models/Account/AccountModel'
import { useSettingsStore } from '@/stores/settings/index'
import { ref } from 'vue'
import AccountFormDialog from './AccountFormDialog.vue';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog.vue'

const store$ = useSettingsStore()

const props = defineProps({
    account: { type: AccountModel, required: true }
})

let setActiveAccount = async (account: AccountModel) => {
    await store$.setActiveAccount(account)
}

let edit_account_dialog = ref(false)
let showEditDialog = () => {
    edit_account_dialog.value = true
}
let closeEditDialog = () => {
    edit_account_dialog.value = false
}

let delete_account_dialog = ref(false)
let showDeleteDialog = () => {
    delete_account_dialog.value = true
}
let closeDeleteDialog = () => {
    delete_account_dialog.value = false
}
let confirmDelete = async () => {
    await store$.deleteAccount(props.account)
    closeDeleteDialog()
}
</script>