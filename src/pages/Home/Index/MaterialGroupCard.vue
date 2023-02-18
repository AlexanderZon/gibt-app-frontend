<template>
    <div>
        <q-card class="ascension-material-group-card text-white"
            :class="{ 'rarity-5': ascensionMaterial.ascension_material_rarity == 5, 'rarity-4': ascensionMaterial.ascension_material_rarity == 4, 'rarity-3': ascensionMaterial.ascension_material_rarity == 3, 'rarity-2': ascensionMaterial.ascension_material_rarity == 2, 'rarity-1': ascensionMaterial.ascension_material_rarity == 1 }"
            @click="toogleOvered()"
            @mouseover="weaponCardMouseOverEvent"
            @mouseleave="weaponCardMouseLeaveEvent">
            <q-card-section class="row items-center q-pa-none">
                <q-img v-if="ascensionMaterial.ascension_material_icon"
                    :src="ascensionMaterial.ascension_material_icon">
                    <div class="weapon-name absolute-bottom text-subtitle2 text-center q-pa-none">
                        {{ ascensionMaterial.quantity }}
                    </div>
                </q-img>
                <template v-if="!(overed || fixed)">
                    <div class="ascension-material-pop ascension-material-character"
                        v-if="ascensionMaterial.items[0].character_icon">
                        <q-img :src="ascensionMaterial.items[0].character_icon">
                        </q-img>
                    </div>
                    <div class="ascension-material-pop ascension-material-weapon"
                        v-if="ascensionMaterial.items[0] instanceof AscensionMaterialGroupWeaponModel && ascensionMaterial.items[0].weapon_icon">
                        <q-img :src="ascensionMaterial.items[0].weapon_icon">
                        </q-img>
                    </div>
                    <div class="ascension-material-pop ascension-material-weapon"
                        v-else-if="ascensionMaterial.items[0] instanceof AscensionMaterialGroupTalentModel">
                        <q-img :src="talent_icon_url">
                        </q-img>
                    </div>
                    <div class="ascension-material-pop ascension-material-weapon"
                        v-else-if="ascensionMaterial.items[0] instanceof AscensionMaterialGroupCharacterModel">
                        <q-img :src="character_icon_url">
                        </q-img>
                    </div>
                    <div class="multiple"
                        v-if="ascensionMaterial.items.length > 1">
                        <q-icon name="mdi-plus" />
                    </div>
                </template>
                <div class="overed"
                    v-if="overed || fixed">
                    <div class="ascension-material-group-pop-container q-pa-md">
                        <div class="ascension-material-group-pop-item row"
                            v-for="(ascencion_material_item, index) in ascensionMaterial.items">
                            <div class="ascension-material-group-pop character">
                                <q-img :src="ascencion_material_item.character_icon">
                                </q-img>
                            </div>
                            <div class="ascension-material-group-pop talent"
                                v-if="ascencion_material_item instanceof AscensionMaterialGroupTalentModel">
                                <q-img :src="talent_icon_url">
                                </q-img>
                            </div>
                            <div class="ascension-material-group-pop talent"
                                v-else-if="ascencion_material_item instanceof AscensionMaterialGroupWeaponModel">
                                <q-img :src="ascencion_material_item.weapon_icon">
                                </q-img>
                            </div>
                            <div class="ascension-material-group-pop talent"
                                v-else-if="ascencion_material_item instanceof AscensionMaterialGroupCharacterModel">
                                <q-img :src="character_icon_url">
                                </q-img>
                            </div>
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
import { AscensionMaterialGroupModel } from '@/classes/models/Account/Dashboard/AscensionMaterialGroup'
import { AscensionMaterialGroupTalentModel, AscensionMaterialGroupWeaponModel, AscensionMaterialGroupCharacterModel } from '@/classes/models/Account/Dashboard/AscensionMaterialGroup'

const props = defineProps({
    ascensionMaterial: { type: [AscensionMaterialGroupModel], required: true }
})

const store$ = useWeaponsStore()
const router = useRouter()

const talent_icon_url = new URL('@/assets/talent_icon.webp', import.meta.url).href
const character_icon_url = new URL('@/assets/character_icon.webp', import.meta.url).href

let overed: Ref<boolean> = ref(false)
let fixed: Ref<boolean> = ref(false)

let weaponCardMouseOverEvent = () => {
    overed.value = true
}

let weaponCardMouseLeaveEvent = () => {
    overed.value = false
}

let toogleOvered = () => {
    fixed.value = !fixed.value
    console.log('toogleOvered: ', fixed.value)
}
</script>