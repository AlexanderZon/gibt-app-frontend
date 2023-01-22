<template>
    <q-page padding>
        <div class="row">
            <div class="col-12">
                <q-card>
                    <q-toolbar class="bg-primary text-white">
                        <q-btn flat
                            round
                            dense>
                            <q-icon name="mdi-arrow-left"
                                @click="goBack" />
                        </q-btn>
                        <q-toolbar-title>
                            {{ actual_model.id ? `Update Character` : `Create Character` }}
                        </q-toolbar-title>
                        <q-btn flat
                            round
                            dense
                            @click="handleFormSubmit">
                            <q-icon name="mdi-content-save" />
                        </q-btn>
                    </q-toolbar>
                    <div class="q-pa-md">
                        <div class="q-gutter-md row">
                            <div class="col-2">
                                <template v-if="actual_model.id != null">
                                    <q-chip v-if="actual_model.character"
                                        square
                                        size="xl"
                                        color="white"
                                        text-color="primary"
                                        class="q-my-none q-ml-xs q-mr-none">
                                        <q-avatar v-if="actual_model.character.icon"
                                            color="primary"
                                            text-color="white">
                                            <img :src="actual_model.character.icon">
                                        </q-avatar>
                                        {{ actual_model.character.name }}
                                    </q-chip>
                                </template>
                                <template v-else>
                                    <q-select filled
                                        v-model="actual_model.character"
                                        :options="availableCharacters"
                                        option-label="name"
                                        use-input
                                        label="Character"
                                        @filter="filterAvailableCharacters"
                                        @update:model-value="selectCharacter">
                                        <template v-slot:selected>
                                            <q-chip v-if="actual_model.character"
                                                dense
                                                square
                                                color="white"
                                                text-color="primary"
                                                class="q-my-none q-ml-xs q-mr-none">
                                                <q-avatar v-if="actual_model.character.icon"
                                                    color="primary"
                                                    text-color="white">
                                                    <img :src="actual_model.character.icon">
                                                </q-avatar>
                                                {{ actual_model.character.name }}
                                            </q-chip>
                                        </template>
                                        <template v-slot:option="scope">
                                            <q-item v-bind="scope.itemProps">
                                                <q-item-section avatar>
                                                    <q-img :src="scope.opt.icon" />
                                                </q-item-section>
                                                <q-item-section>
                                                    <q-item-label>{{ scope.opt.name }}</q-item-label>
                                                    <q-item-label caption>{{ scope.opt.rarity }}</q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </template>
                                    </q-select>
                                </template>
                            </div>
                            <div class="col-2">
                                <q-select filled
                                    v-model="actual_model.level"
                                    :options="levels"
                                    label="Level" />
                            </div>
                            <div class="col-2">
                                <q-select filled
                                    v-model="actual_model.constellation_level"
                                    :options="constellation_levels"
                                    label="Constellation Level" />
                            </div>
                        </div>
                    </div>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import AccountCharacterModel from '@/classes/models/Account/Characters/CharacterModel'
import { ref, reactive, computed, onBeforeMount, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useCharactersStore } from '@/stores/characters/index'
import CharacterModel from '@/classes/models/Characters/CharacterModel'
import { useRouter, useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const store$ = useCharactersStore()
const router = useRouter()
const route = useRoute()

let loading = ref(false)

let actual_model: AccountCharacterModel = reactive(new AccountCharacterModel())

let goBack = () => {
    router.push({ name: 'characters' })
}

let character_search: Ref<string | null> = ref(null)
let availableCharacters = computed(() => {
    return store$.characters.filter(character => {
        if (character_search.value != null && character.name.toLocaleUpperCase().indexOf(character_search.value.toLocaleUpperCase()) < 0) return false
        return true
    })
})
let filterAvailableCharacters = (val: string, done: Function) => {
    character_search.value = val
    done()
}

let levels = ['1', '20', '20+', '40', '40+', '50', '50+', '60', '60+', '70', '70+', '80', '80+', '90']
let constellation_levels = [0, 1, 2, 3, 4, 5, 6]

let selectCharacter = (character: CharacterModel) => {
    //
}

let handleFormSubmit = () => {

    v$.value.actual_model.$validate();

    if (!v$.value.actual_model.$error) {
        loading.value = true
        if (actual_model.id == null) {
            store$.store(new AccountCharacterModel(actual_model)).then((response: any) => {
                loading.value = false
                router.push({ name: 'characters' })
            })
        } else {
            store$.update(new AccountCharacterModel(actual_model)).then((response: any) => {
                loading.value = false
                router.push({ name: 'characters' })
            })
        }
    } else {
        console.log("Error")
    }
}

// Validator
const rules = computed(() => {
    return {
        actual_model: {
            character: { required },
            level: { required },
            constellation_level: { required },
        },
    }
})

const v$ = useVuelidate(rules, { actual_model })

onMounted(async () => {
    loading.value = true
    if (route.params.id && typeof route.params.id === 'string') {
        let response = await store$.edit(new AccountCharacterModel({ id: route.params.id })).catch((thrown: Error) => {
            if (thrown.message == 'CharacterDoNotBelongsToActualAccountException') {
                router.push({ name: 'characters' })
            }
        })
        if (response) actual_model.fill(response)
    } else {
        await store$.create()
        console.log('ActualModel: ', actual_model)
    }
    loading.value = false
})
</script>

<style lang="sass">

</style>