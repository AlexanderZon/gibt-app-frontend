<template>
    <q-page padding>
        <div class="q-pa-md">
            <div class="row q-mb-md">
                <div class="col">
                    <span class="farming-label text-h6">Farming for
                        <span class="farming-nav">
                            <q-btn flat
                                round
                                color="primary"
                                icon="chevron_left"
                                :disabled="day <= -3"
                                @click="() => day--" />
                            <span class="farming-nav-label">
                                {{ getActualDate }}
                                <template v-if="day == 0">
                                    <em class="today">(today)</em>
                                </template>
                                <template v-else-if="day == 1">
                                    <em>(tomorrow)</em>
                                </template>
                                <template v-else-if="day == -1">
                                    <em>(yesterday)</em>
                                </template>
                                <template v-else-if="day > 0">
                                    <em>(+{{ day }} days)</em>
                                </template>
                                <template v-else="day < 0">
                                    <em>({{ day }} days)</em>
                                </template>
                            </span>
                            <q-btn flat
                                round
                                color="primary"
                                icon="chevron_right"
                                :disabled="day >= 3"
                                @click="() => day++" />
                        </span>
                    </span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-if="farmingForToday.length > 0"
                    v-for="(ascension_material, index) in farmingForToday">
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
                </div>
                <div class="col-12"
                    v-else>
                    <template v-if="day > 0">There is no farming for <strong>{{ getActualDate }}</strong></template>
                    <template v-else>There was no farming for <strong>{{ getActualDate }}</strong></template>
                </div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Boss Materials</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-if="bossMaterials.length > 0"
                    v-for="(ascension_material, index) in bossMaterials">
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
                </div>
                <div class="col-12"
                    v-else>There are no Boss Materials required</div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Elemental Stones</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-if="elementalStones.length > 0"
                    v-for="(ascension_material, index) in elementalStones">
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
                </div>
                <div class="col-12"
                    v-else>There are no Elemental Stoned required</div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Char Jewels</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-if="charJewels.length"
                    v-for="(ascension_material, index) in charJewels">
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
                </div>
                <div class="col-12"
                    v-else>There are no Char Jewels required</div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Char Local Materials</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-if="charLocalMaterials.length > 0"
                    v-for="(ascension_material, index) in charLocalMaterials">
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
                </div>
                <div class="col-12"
                    v-else>There are no Local Materials required</div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Common Materials</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-if="commonMaterials.length > 0"
                    v-for="(ascension_material, index) in commonMaterials">
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
                </div>
                <div class="col-12"
                    v-else>There are no Common Materials required</div>
            </div>
            <div class="row q-my-md">
                <div class="col">
                    <span class="text-h6">Weapon Secondary Materials</span>
                </div>
            </div>
            <div class="q-col-gutter-md row">
                <div class="col-1"
                    v-if="weapSecondaryMaterials.length > 0"
                    v-for="(ascension_material, index) in weapSecondaryMaterials">
                    <MaterialGroupCard :ascension-material="ascension_material"></MaterialGroupCard>
                </div>
                <div class="col-12"
                    v-else>There are no Weapon Secondary Materials required</div>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useDashboardStore } from '@/stores/dashboard/index'
import MaterialGroupCard from './Index/MaterialGroupCard.vue'
import { AscensionMaterialGroupModel } from '@/classes/models/Account/Dashboard/AscensionMaterialGroup'
import moment from 'moment'

const store$ = useDashboardStore()

let loading = ref(false)

let day = ref(0);
let farmingForToday = computed(() => {
    let ascension_materials_list: Array<AscensionMaterialGroupModel> = []
    if (store$.day_farming_groups.length > 0) {
        // store$.talent_book_groups.forEach(talent_book => {
        //     if (talent_book.can_farm_today) ascension_materials_list.push(talent_book)
        // })
        store$.day_farming_groups[day.value].talent_book_groups.forEach(talent_book => {
            if (talent_book.can_farm_today) ascension_materials_list.push(talent_book)
        })
        // store$.weap_primary_material_groups.forEach(weap_primary_material_group => {
        //     if (weap_primary_material_group.can_farm_today) ascension_materials_list.push(weap_primary_material_group)
        // })
        store$.day_farming_groups[day.value].weap_primary_material_groups.forEach(weap_primary_material => {
            if (weap_primary_material.can_farm_today) ascension_materials_list.push(weap_primary_material)
        })
    }
    return ascension_materials_list
})
let getActualDate = computed(() => {
    if (store$.day_farming_groups.length > 0) {
        let date = moment(store$.day_farming_groups[day.value].date)
        return `${date.format('LL')}`
    }
    return null
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