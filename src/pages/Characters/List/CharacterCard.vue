<template>
    <div>
        <q-card class="character-card text-white"
            v-if="accountCharacter.character"
            :class="{ 'rarity-5': accountCharacter.character.rarity == 5, 'rarity-4': accountCharacter.character.rarity == 4 }"
            @mouseover="characterCardMouseOverEvent"
            @mouseleave="characterCardMouseLeaveEvent">
            <q-card-section class="row items-center q-pa-none">
                <q-img v-if="accountCharacter.character.icon"
                    :src="accountCharacter.character.icon">
                    <div class="character-name absolute-bottom text-subtitle2 text-center q-pa-none">
                        {{ accountCharacter.character.name }}
                    </div>
                </q-img>
                <div class="overed"
                    v-if="overed">
                    <div class="q-pa-xs">
                        <div class="q-gutter-xs row">
                            <q-btn round
                                color="amber"
                                size="sm"
                                icon="mdi-pencil"
                                @click="goToCharactersForm" />
                            <q-btn round
                                color="red"
                                size="sm"
                                icon="mdi-trash-can"
                                @click="showConfirmDeleteDialog" />
                            <q-btn round
                                color="blue"
                                size="sm"
                                icon="mdi-playlist-plus" />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
        <q-dialog v-model="delete_confirm"
            persistent>
            <q-card v-if="accountCharacter.character">
                <q-card-section class="row items-center">
                    <q-avatar v-if="accountCharacter.character.icon"
                        text-color="white">
                        <img :src="accountCharacter.character.icon" />
                    </q-avatar>
                    <span class="q-ml-sm">Are you sure to delete <strong>{{ accountCharacter.character.name }}</strong>?.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat
                        label="Cancel"
                        color="primary"
                        v-close-popup />
                    <q-btn flat
                        :loading="delete_loading"
                        label="Yes, Delete"
                        color="red"
                        @click="deleteCharacter" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup lang="ts">
import AccountCharacterModel from '@/classes/models/Account/Characters/CharacterModel'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCharactersStore } from '@/stores/characters/index'

const props = defineProps({
    accountCharacter: { type: AccountCharacterModel, required: true }
})

const store$ = useCharactersStore()
const router = useRouter()

let overed: Ref<boolean> = ref(false)
let delete_loading: Ref<boolean> = ref(false)
let delete_confirm: Ref<boolean> = ref(false)

let characterCardMouseOverEvent = () => {
    overed.value = true
}

let characterCardMouseLeaveEvent = () => {
    overed.value = false
}

let showConfirmDeleteDialog = () => {
    delete_confirm.value = true
}

let deleteCharacter = async () => {
    delete_loading.value = true
    await store$.delete(props.accountCharacter)
    delete_loading.value = false
    delete_confirm.value = false
}

let goToCharactersForm = () => {
    router.push({ name: 'characters/edit', params: { id: props.accountCharacter.id } })
}
</script>