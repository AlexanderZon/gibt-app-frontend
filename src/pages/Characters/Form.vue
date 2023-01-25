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
                            :loading="loading"
                            @click="handleFormSubmit">
                            <q-icon name="mdi-content-save" />
                        </q-btn>
                    </q-toolbar>
                    <div class="q-pa-md">
                        <div class="q-col-gutter-md row">
                            <div class="col-3">
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
                                        :options="characters"
                                        option-label="name"
                                        use-input
                                        label="Character"
                                        @filter="filterCharacters"
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
                            <div class="col-3">
                                <q-select filled
                                    v-model="actual_model.account_weapon"
                                    :options="account_weapons"
                                    option-label="name"
                                    use-input
                                    label="Weapon"
                                    @filter="filterWeapons">
                                    <template v-slot:selected>
                                        <q-chip v-if="actual_model.account_weapon && actual_model.account_weapon.weapon"
                                            dense
                                            square
                                            color="white"
                                            text-color="primary"
                                            class="q-my-none q-ml-xs q-mr-none">
                                            <q-avatar v-if="actual_model.account_weapon.weapon.icon"
                                                color="primary"
                                                text-color="white">
                                                <img :src="actual_model.account_weapon.weapon.icon">
                                            </q-avatar>
                                            {{ actual_model.account_weapon.weapon.name }}
                                        </q-chip>
                                    </template>
                                    <template v-slot:option="scope">
                                        <q-item v-bind="scope.itemProps">
                                            <q-item-section avatar>
                                                <q-img :src="scope.opt.weapon.icon" />
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label>{{ scope.opt.weapon.name }}</q-item-label>
                                                <q-item-label caption>{{ scope.opt.level }}</q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                </q-select>
                            </div>
                            <div class="col-3">
                                <q-select filled
                                    v-model="actual_model.level"
                                    :options="levels"
                                    label="Level" />
                            </div>
                            <div class="col-3">
                                <q-select filled
                                    v-model="actual_model.constellation_level"
                                    :options="constellation_levels"
                                    label="Constellation Level" />
                            </div>
                            <div class="col-3">
                                <q-select filled
                                    v-model="actual_model.basic_talent_level"
                                    :options="basic_talent_levels"
                                    label="Basic Talent Level" />
                            </div>
                            <div class="col-3">
                                <q-select filled
                                    v-model="actual_model.elemental_talent_level"
                                    :options="elemental_talent_levels"
                                    label="Elemental Talent Level"
                                    hint="Without constellations upgrade" />
                            </div>
                            <div class="col-3">
                                <q-select filled
                                    v-model="actual_model.burst_talent_level"
                                    :options="burst_talent_levels"
                                    label="Burst Talent Level"
                                    hint="Without constellations upgrade" />
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
import AccountWeaponModel from '@/classes/models/Account/Weapon/WeaponModel'

const store$ = useCharactersStore()
const router = useRouter()
const route = useRoute()

let loading = ref(false)

let actual_model: AccountCharacterModel = reactive(new AccountCharacterModel())

let goBack = () => {
    router.push({ name: 'characters' })
}

let character_search: Ref<string | null> = ref(null)
let characters = computed(() => {
    return store$.characters.filter(character => {
        if (character_search.value != null && character.name.toLocaleUpperCase().indexOf(character_search.value.toLocaleUpperCase()) < 0) return false
        return true
    })
})
let filterCharacters = (val: string, done: Function) => {
    character_search.value = val
    done()
}
let selectCharacter = ($event: CharacterModel) => {
    if (actual_model.account_weapon && actual_model.account_weapon.weapon && actual_model.account_weapon.weapon.weapon_type_id != $event.weapon_type_id) actual_model.account_weapon = null
}

let account_weapon_search: Ref<string | null> = ref(null)
let account_weapons = computed(() => {
    return store$.account_weapons.filter((account_weapon: AccountWeaponModel) => {
        if (account_weapon_search.value != null && account_weapon.weapon && account_weapon.weapon.name.toLocaleUpperCase().indexOf(account_weapon_search.value.toLocaleUpperCase()) < 0) return false
        if (actual_model.character && account_weapon.weapon && account_weapon.weapon.weapon_type_id != actual_model.character.weapon_type_id) return false
        return true
    })
})
let filterWeapons = (val: string, done: Function) => {
    account_weapon_search.value = val
    done()
}

let levels = ['1', '20', '20+', '40', '40+', '50', '50+', '60', '60+', '70', '70+', '80', '80+', '90']
let constellation_levels = [0, 1, 2, 3, 4, 5, 6]
let basic_talent_levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let elemental_talent_levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let burst_talent_levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

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
            account_weapon: { required },
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
    }
    loading.value = false
})
</script>

<style lang="sass">

</style>