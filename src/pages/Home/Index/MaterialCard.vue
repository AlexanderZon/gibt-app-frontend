<template>
    <div>
        <q-card class="ascension-material-card text-white"
            :class="{ 'rarity-5': ascensionMaterial.ascension_material_rarity == 5, 'rarity-4': ascensionMaterial.ascension_material_rarity == 4, 'rarity-3': ascensionMaterial.ascension_material_rarity == 3, 'rarity-2': ascensionMaterial.ascension_material_rarity == 2, 'rarity-1': ascensionMaterial.ascension_material_rarity == 1 }"
            @mouseover="weaponCardMouseOverEvent"
            @mouseleave="weaponCardMouseLeaveEvent">
            <q-card-section class="row items-center q-pa-none">
                <q-img v-if="ascensionMaterial.ascension_material_icon"
                    :src="ascensionMaterial.ascension_material_icon">
                    <div class="weapon-name absolute-bottom text-subtitle2 text-center q-pa-none">
                        {{ ascensionMaterial.quantity }}
                    </div>
                </q-img>
                <div class="ascension-material-pop ascension-material-character"
                    v-if="ascensionMaterial.character_icon">
                    <q-img :src="ascensionMaterial.character_icon">
                    </q-img>
                </div>
                <div class="ascension-material-pop ascension-material-weapon"
                    v-if="ascensionMaterial instanceof WeapAscensionMaterialModel && ascensionMaterial.weapon_icon">
                    <q-img :src="ascensionMaterial.weapon_icon">
                    </q-img>
                </div>
                <div class="overed"
                    v-if="overed">
                    <div class="q-pa-xs">
                        <div class="q-gutter-xs row">
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWeaponsStore } from '@/stores/weapons/index'
import { CharAscensionMaterialModel } from '@/classes/models/Account/Dashboard/CharAscensionMaterial'
import { WeapAscensionMaterialModel } from '@/classes/models/Account/Dashboard/WeapAscensionMaterial'

const props = defineProps({
    ascensionMaterial: { type: [CharAscensionMaterialModel, WeapAscensionMaterialModel], required: true }
})

const store$ = useWeaponsStore()
const router = useRouter()

let overed: Ref<boolean> = ref(false)
let delete_loading: Ref<boolean> = ref(false)
let delete_confirm: Ref<boolean> = ref(false)

let weaponCardMouseOverEvent = () => {
    overed.value = true
}

let weaponCardMouseLeaveEvent = () => {
    overed.value = false
}

let showConfirmDeleteDialog = () => {
    delete_confirm.value = true
}
</script>