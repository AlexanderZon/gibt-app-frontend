<template>
    <q-page padding>
        <div class="q-pa-md">
            <div class="q-col-gutter-md row">
                <div class="col-lg-1 col-xs-3 col-sm-2">
                    <q-card class="character-card void text-white"
                        style="">
                        <q-card-section class="row items-center"
                            @click="goToCharactersForm()">
                            <div class="text-h6">Add Character</div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-lg-1 col-xs-3 col-sm-2"
                    v-for="(account_character, index) in characters">
                    <CharacterCard :account-character="account_character"></CharacterCard>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'
import type { ComputedRef } from 'vue'
import { useCharactersStore } from '@/stores/characters/index'
import { useRouter } from 'vue-router'
import CharacterCard from './List/CharacterCard.vue';
import AccountCharacterModel from '@/classes/models/Account/Characters/CharacterModel';

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

let characters: ComputedRef<AccountCharacterModel[]> = computed(() => {
    return store$.account_characters.sort((a: AccountCharacterModel, b: AccountCharacterModel): number => {
        if (a.is_building && !b.is_building) return -1
        else if (!a.is_building && b.is_building) return 1
        else {
            if (a.character && b.character) {
                if (a.level > b.level) return -1
                else if (a.level < b.level) return 1
                else {
                    if (a.character.rarity > b.character.rarity) return -1
                    else if (a.character.rarity < b.character.rarity) return 1
                    else return 0
                }
            } else {
                return 0
            }
        }
    })
})

onBeforeMount(async () => {
    await store$.get()
})
</script>