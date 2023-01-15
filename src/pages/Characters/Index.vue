<template>
    <q-page padding>
        <div class="row">
            <div class="col-1">
                <q-card class="character-card void text-white"
                    style="">
                    <q-card-section class="row items-center">
                        <div class="text-h6">Add Character</div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { AxiosError, AxiosResponse } from 'axios';
import { ref, reactive, computed, onBeforeMount } from 'vue'

let loading = ref(false)

onBeforeMount(() => {
    loading.value = true
})
</script>

<style lang="sass">
.character-card.void
    cursor: pointer
    background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)
    min-height: 150px
    text-align: center
    .q-card__section 
        min-height: 150px

</style>