<template>
    <q-dialog v-model="dialog">
        <q-card>
            <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">
                    <slot name="title">{{ title }}</slot>
                </div>
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
                            <slot name="content">{{ content }}</slot>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat
                    :label="cancelText"
                    :color="`${cancelColor}`"
                    v-close-popup />
                <q-btn flat
                    :label="confirmText"
                    :color="`${confirmColor}`"
                    @click="confirm" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    title: { type: String, default: 'Confirm?' },
    content: { type: String, default: 'Are you sure to Confirm?' },
    confirmText: { type: String, default: 'Confirm' },
    cancelText: { type: String, default: 'Cancel' },
    confirmColor: { type: String, default: 'primary' },
    cancelColor: { type: String, default: 'primary' }
})
const emit = defineEmits(['close', 'confirm'])

let dialog = ref(true)

watch(dialog, (newDialog) => {
    if (newDialog === false) {
        emit('close')
    }
})

let confirm = async () => {
    closeNewAccountFormDialog()
    emit('confirm')
}

let closeNewAccountFormDialog = () => {
    dialog.value = false
}
</script>