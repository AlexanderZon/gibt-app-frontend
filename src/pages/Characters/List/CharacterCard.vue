<template>
    <div>
        <q-card class="character-card text-white"
            v-if="accountCharacter.character"
            :class="{ 'rarity-5': accountCharacter.character.rarity == 5, 'rarity-4': accountCharacter.character.rarity == 4 }"
            @mouseover="characterCardMouseOverEvent"
            @mouseleave="characterCardMouseLeaveEvent">
            <q-card-section class="row items-center q-pa-none">
                <div class="character-picture">
                    <q-img v-if="accountCharacter.character.icon"
                        :src="accountCharacter.character.icon">
                        <div class="character-name absolute-bottom text-subtitle2 text-center q-pa-none">
                            {{ accountCharacter.character.name }}
                        </div>
                    </q-img>
                </div>
                <div class="character-pop character-level">
                    {{ accountCharacter.level }}
                </div>
                <div class="character-pop character-weapon">
                    <q-img v-if="accountCharacter.account_weapon?.weapon?.icon"
                        :src="accountCharacter.account_weapon?.weapon?.icon">
                    </q-img>
                </div>
                <div class="character-pop character-is-building bg-green"
                    v-if="accountCharacter.is_building">
                    <q-icon name="mdi-hammer-wrench" />
                </div>
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
                            <template v-if="accountCharacter.is_building">
                                <q-btn round
                                    color="green"
                                    size="sm"
                                    icon="mdi-playlist-remove"
                                    @click="showConfirmRemoveToCharactersListDialog" />
                            </template>
                            <template v-else>
                                <q-btn round
                                    color="blue"
                                    size="sm"
                                    icon="mdi-playlist-plus"
                                    @click="showConfirmAddToCharactersListDialog" />
                            </template>
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
        <q-dialog v-model="add_to_characters_list_dialog"
            persistent>
            <q-card v-if="accountCharacter.character">
                <q-card-section class="row items-center">
                    <q-avatar v-if="accountCharacter.character.icon"
                        text-color="white">
                        <img :src="accountCharacter.character.icon" />
                    </q-avatar>
                    <span class="q-ml-sm">Add <strong>{{ accountCharacter.character.name }}</strong> to the building list?.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat
                        label="Cancel"
                        color="primary"
                        v-close-popup />
                    <q-btn flat
                        :loading="add_to_characters_list_loading"
                        label="Yes, Add"
                        color="red"
                        @click="addCharacterToList" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="remove_to_characters_list_dialog"
            persistent>
            <q-card v-if="accountCharacter.character">
                <q-card-section class="row items-center">
                    <q-avatar v-if="accountCharacter.character.icon"
                        text-color="white">
                        <img :src="accountCharacter.character.icon" />
                    </q-avatar>
                    <span class="q-ml-sm">Remove <strong>{{ accountCharacter.character.name }}</strong> from the building list?.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat
                        label="Cancel"
                        color="primary"
                        v-close-popup />
                    <q-btn flat
                        :loading="remove_to_characters_list_loading"
                        label="Yes, Remove"
                        color="red"
                        @click="removeCharacterToList" />
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
let characterCardMouseOverEvent = () => {
    overed.value = true
}
let characterCardMouseLeaveEvent = () => {
    overed.value = false
}

let delete_loading: Ref<boolean> = ref(false)
let delete_confirm: Ref<boolean> = ref(false)
let showConfirmDeleteDialog = () => {
    delete_confirm.value = true
}
let deleteCharacter = async () => {
    delete_loading.value = true
    await store$.delete(props.accountCharacter).catch(thrown => {
        delete_loading.value = false
    })
    delete_loading.value = false
    delete_confirm.value = false
}

let add_to_characters_list_loading: Ref<boolean> = ref(false)
let add_to_characters_list_dialog: Ref<boolean> = ref(false)
let showConfirmAddToCharactersListDialog = () => {
    add_to_characters_list_dialog.value = true
}
let addCharacterToList = async () => {
    add_to_characters_list_loading.value = true
    await store$.add(props.accountCharacter).catch(thrown => {
        add_to_characters_list_loading.value = false
    })
    add_to_characters_list_loading.value = false
    add_to_characters_list_dialog.value = false
}

let remove_to_characters_list_loading: Ref<boolean> = ref(false)
let remove_to_characters_list_dialog: Ref<boolean> = ref(false)
let showConfirmRemoveToCharactersListDialog = () => {
    remove_to_characters_list_dialog.value = true
}
let removeCharacterToList = async () => {
    remove_to_characters_list_loading.value = true
    await store$.remove(props.accountCharacter).catch(thrown => {
        remove_to_characters_list_loading.value = false
    })
    remove_to_characters_list_loading.value = false
    remove_to_characters_list_dialog.value = false
}

let goToCharactersForm = () => {
    router.push({ name: 'characters/edit', params: { id: props.accountCharacter.id } })
}
</script>