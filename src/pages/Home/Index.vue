<template>
    <q-page padding>
        <div class="q-pa-md">
            <div class="row q-mb-md">
                <div class="col">
                    <span class="text-h6">Farming for today</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-for="(ascension_material, index) in farmingForToday">
                    <MaterialCard :ascension-material="ascension_material"></MaterialCard>
                </div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Boss Materials</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-for="(ascension_material, index) in bossMaterials">
                    <MaterialCard :ascension-material="ascension_material"></MaterialCard>
                </div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Elemental Stones</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-for="(ascension_material, index) in elementalStones">
                    <MaterialCard :ascension-material="ascension_material"></MaterialCard>
                </div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Char Jewels</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-for="(ascension_material, index) in charJewels">
                    <MaterialCard :ascension-material="ascension_material"></MaterialCard>
                </div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Char Local Materials</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-for="(ascension_material, index) in charLocalMaterials">
                    <MaterialCard :ascension-material="ascension_material"></MaterialCard>
                </div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Common Materials</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-for="(ascension_material, index) in commonMaterials">
                    <MaterialCard :ascension-material="ascension_material"></MaterialCard>
                </div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Weapon Secondary Materials</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-for="(ascension_material, index) in weapSecondaryMaterials">
                    <MaterialCard :ascension-material="ascension_material"></MaterialCard>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { AxiosError, AxiosResponse } from 'axios';
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useDashboardStore } from '@/stores/dashboard/index'
import { useRouter } from 'vue-router'
import MaterialCard from './Index/MaterialCard.vue';
import { CharAscensionMaterialModel } from '@/classes/models/Account/Dashboard/CharAscensionMaterial';
import { WeapAscensionMaterialModel } from '@/classes/models/Account/Dashboard/WeapAscensionMaterial';

const store$ = useDashboardStore()
const router = useRouter()

let loading = ref(false)

let farmingForToday = computed(() => {
    let ascension_materials_list: Array<CharAscensionMaterialModel | WeapAscensionMaterialModel> = []
    store$.talent_books.forEach(talent_book => {
        if (talent_book.can_farm_today) ascension_materials_list.push(talent_book)
    })
    store$.weap_primary_materials.forEach(weap_primary_material => {
        if (weap_primary_material.can_farm_today) ascension_materials_list.push(weap_primary_material)
    })
    return ascension_materials_list
})

let bossMaterials = computed(() => {
    return store$.boss_materials
})

let elementalStones = computed(() => {
    return store$.char_elemental_stones
})

let charJewels = computed(() => {
    return store$.char_jewels
})

let charLocalMaterials = computed(() => {
    return store$.char_local_materials
})

let commonMaterials = computed(() => {
    let ascension_materials_list: Array<CharAscensionMaterialModel | WeapAscensionMaterialModel> = []
    store$.char_common_items.forEach(char_common_item => {
        ascension_materials_list.push(char_common_item)
    })
    store$.weap_common_items.forEach(weap_common_item => {
        ascension_materials_list.push(weap_common_item)
    })
    return ascension_materials_list
})

let weapSecondaryMaterials = computed(() => {
    return store$.weap_secondary_materials
})

onBeforeMount(async () => {
    loading.value = true
    await store$.get()
    loading.value = false
})
</script>