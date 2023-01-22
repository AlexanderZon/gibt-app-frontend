<template>
    <q-page padding>
        <div class="q-pa-md">
            <div class="q-gutter-md row">
                <div class="col-1">
                    <q-card class="character-card void text-white"
                        style="">
                        <q-card-section class="row items-center"
                            @click="goToCharactersForm()">
                            <div class="text-h6">Add Character</div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-1"
                    v-for="(account_character, index) in characters">
                    <CharacterCard :account-character="account_character"></CharacterCard>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useCharactersStore } from '@/stores/characters/index'
import { useRouter } from 'vue-router'
import CharacterCard from './List/CharacterCard.vue';

const store$ = useCharactersStore()
const router = useRouter()

let loading = ref(false)

let goToCharactersForm = (character_id?: number) => {
    if (character_id) {
        router.push({ name: 'characters/edit', params: { id: character_id } })
    } else {
        router.push({ name: 'characters/create' })
    }
}

let characters = computed(() => {
    return store$.account_characters
})

onBeforeMount(async () => {
    await store$.get()
})
</script>

<style lang="sass">
.character-card
    cursor: pointer
    min-height: 130px
    text-align: center
    &.void
        background: linear-gradient(135deg, #014a88 0%, #35a2ff 100%)
    &.rarity-5
        background: linear-gradient(135deg, #6C5652 0%, #E5AF57 100%)
    &.rarity-4
        background: linear-gradient(135deg, #5F5581 0%, #B085C8 100%)
    .q-card__section 
        min-height: 130px
    .character-name
        padding: 0 !important
    .q-img
        position: absolute
        bottom: 0
        height: 130px
        img 
            padding-bottom: 22px
</style>