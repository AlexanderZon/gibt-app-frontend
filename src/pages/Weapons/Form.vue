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
                            {{ actual_model.id ? `Update Weapon` : `Create Weapon` }}
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
                                    <q-chip v-if="actual_model.weapon"
                                        square
                                        size="xl"
                                        color="white"
                                        text-color="primary"
                                        class="q-my-none q-ml-xs q-mr-none">
                                        <q-avatar v-if="actual_model.weapon.icon"
                                            color="primary"
                                            text-color="white">
                                            <img :src="actual_model.weapon.icon">
                                        </q-avatar>
                                        {{ actual_model.weapon.name }}
                                    </q-chip>
                                </template>
                                <template v-else>
                                    <q-select filled
                                        v-model="actual_model.weapon"
                                        :options="availableWeapons"
                                        option-label="name"
                                        use-input
                                        label="Weapon"
                                        @filter="filterAvailableWeapons"
                                        @update:model-value="selectWeapon">
                                        <template v-slot:selected>
                                            <q-chip v-if="actual_model.weapon"
                                                dense
                                                square
                                                color="white"
                                                text-color="primary"
                                                class="q-my-none q-ml-xs q-mr-none">
                                                <q-avatar v-if="actual_model.weapon.icon"
                                                    color="primary"
                                                    text-color="white">
                                                    <img :src="actual_model.weapon.icon">
                                                </q-avatar>
                                                {{ actual_model.weapon.name }}
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
                                    v-model="actual_model.refinement_rank"
                                    :options="refinement_ranks"
                                    label="Refinement Rank" />
                            </div>
                        </div>
                    </div>
                </q-card>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import AccountWeaponModel from '@/classes/models/Account/Weapon/WeaponModel'
import { ref, reactive, computed, onBeforeMount, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useWeaponsStore } from '@/stores/weapons/index'
import WeaponModel from '@/classes/models/Weapon/WeaponModel'
import { useRouter, useRoute } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

const store$ = useWeaponsStore()
const router = useRouter()
const route = useRoute()

let loading = ref(false)

let actual_model: AccountWeaponModel = reactive(new AccountWeaponModel())

let goBack = () => {
    router.push({ name: 'weapons' })
}

let weapon_search: Ref<string | null> = ref(null)
let availableWeapons = computed(() => {
    return store$.weapons.filter(weapon => {
        if (weapon_search.value != null && weapon.name.toLocaleUpperCase().indexOf(weapon_search.value.toLocaleUpperCase()) < 0) return false
        return true
    })
})
let filterAvailableWeapons = (val: string, done: Function) => {
    weapon_search.value = val
    done()
}

let levels = ['1', '20', '20+', '40', '40+', '50', '50+', '60', '60+', '70', '70+', '80', '80+', '90']
let refinement_ranks = [1, 2, 3, 4, 5]

let selectWeapon = (weapon: WeaponModel) => {
    //
}

let handleFormSubmit = () => {

    v$.value.actual_model.$validate();

    if (!v$.value.actual_model.$error) {
        loading.value = true
        if (actual_model.id == null) {
            store$.store(new AccountWeaponModel(actual_model)).then((response: any) => {
                loading.value = false
                router.push({ name: 'weapons' })
            })
        } else {
            store$.update(new AccountWeaponModel(actual_model)).then((response: any) => {
                loading.value = false
                router.push({ name: 'weapons' })
            })
        }
    } else {
        //
    }
}

// Validator
const rules = computed(() => {
    return {
        actual_model: {
            weapon: { required },
            level: { required },
            refinement_rank: { required },
        },
    }
})

const v$ = useVuelidate(rules, { actual_model })

onMounted(async () => {
    loading.value = true
    if (route.params.id && typeof route.params.id === 'string') {
        let response = await store$.edit(new AccountWeaponModel({ id: route.params.id })).catch((thrown: Error) => {
            if (thrown.message == 'WeaponDoNotBelongsToActualAccountException') {
                router.push({ name: 'weapons' })
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