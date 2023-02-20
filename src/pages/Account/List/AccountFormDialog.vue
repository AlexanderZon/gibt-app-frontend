<template>
    <q-dialog v-model="dialog">
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
                                v-model="account.title"
                                label="Title" />
                        </div>
                        <div class="col-md-12">
                            <q-select outlined
                                v-model="account.game_server"
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
                    @click="handleFormSubmit" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import AccountModel from '@/classes/models/Account/AccountModel'
import { ref, reactive, watch, onBeforeMount } from 'vue';
import { useSettingsStore } from '@/stores/settings/index'

const store$ = useSettingsStore()
const props = defineProps({
    account: { type: AccountModel, required: true }
})
const emit = defineEmits(['close'])

let dialog = ref(true)
let game_server_options = ['NA', 'EU', 'AS', 'TW']
let account: AccountModel

watch(dialog, (newDialog) => {
    if (newDialog === false) {
        emit('close')
    }
})

let handleFormSubmit = async () => {
    closeNewAccountFormDialog()
    if (props.account.id) {
        await store$.updateAccount(account)
    } else {
        await store$.storeAccount(account)
    }
}

let closeNewAccountFormDialog = () => {
    dialog.value = false
}

onBeforeMount(() => {
    account = reactive(new AccountModel(props.account))
})
</script>