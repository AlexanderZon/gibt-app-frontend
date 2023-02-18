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
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
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
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
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
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
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
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
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
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
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
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
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
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
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
import MaterialGroupCard from './Index/MaterialGroupCard.vue';
import { AscensionMaterialGroupModel } from '@/classes/models/Account/Dashboard/AscensionMaterialGroup';
import { CharAscensionMaterialModel } from '@/classes/models/Account/Dashboard/CharAscensionMaterial';
import { WeapAscensionMaterialModel } from '@/classes/models/Account/Dashboard/WeapAscensionMaterial';

const store$ = useDashboardStore()
const router = useRouter()

let loading = ref(false)

let farmingForToday = computed(() => {
    let ascension_materials_list: Array<AscensionMaterialGroupModel> = []
    store$.talent_book_groups.forEach(talent_book => {
        if (talent_book.can_farm_today) ascension_materials_list.push(talent_book)
    })
    store$.weap_primary_material_groups.forEach(weap_primary_material_group => {
        if (weap_primary_material_group.can_farm_today) ascension_materials_list.push(weap_primary_material_group)
    })
    return ascension_materials_list
})

let bossMaterials = computed(() => {
    return store$.boss_material_groups
})

let elementalStones = computed(() => {
    return store$.char_elemental_stone_groups
})

let charJewels = computed(() => {
    return store$.char_jewel_groups
})

let charLocalMaterials = computed(() => {
    return store$.char_local_material_groups
})

let commonMaterials = computed(() => {
    return store$.common_material_groups
})

let weapSecondaryMaterials = computed(() => {
    return store$.weap_secondary_material_groups
})

onBeforeMount(async () => {
    loading.value = true
    await store$.get()
    loading.value = false
})
</script>