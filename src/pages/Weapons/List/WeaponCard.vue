<template>
    <div>
        <q-card v-if="accountWeapon.weapon"
            class="weapon-card text-white"
            :class="{ 'rarity-5': accountWeapon.weapon.rarity == 5, 'rarity-4': accountWeapon.weapon.rarity == 4, 'rarity-3': accountWeapon.weapon.rarity == 3, 'rarity-2': accountWeapon.weapon.rarity == 2, 'rarity-1': accountWeapon.weapon.rarity == 1 }"
            @mouseover="weaponCardMouseOverEvent"
            @mouseleave="weaponCardMouseLeaveEvent">
            <q-card-section class="row items-center q-pa-none">
                <q-img v-if="accountWeaponIcon"
                    :src="accountWeaponIcon">
                    <div class="weapon-name absolute-bottom text-subtitle2 text-center q-pa-none">
                        {{ accountWeapon.weapon.name }}
                    </div>
                </q-img>
                <div class="weapon-pop weapon-level">
                    {{ accountWeapon.level }}
                </div>
                <div class="weapon-pop weapon-character"
                    v-if="accountWeapon.account_character">
                    <q-img v-if="accountWeapon.account_character?.character?.icon"
                        :src="accountWeapon.account_character?.character?.icon">
                    </q-img>
                </div>
                <div class="weapon-refinement-rank"
                    :class="{ 'rank-5': accountWeapon.refinement_rank == 5, 'rank-4': accountWeapon.refinement_rank == 4, 'rank-3': accountWeapon.refinement_rank == 3, 'rank-2': accountWeapon.refinement_rank == 2, 'rank-1': accountWeapon.refinement_rank == 1 }">
                    {{ accountWeapon.refinement_rank }}
                </div>
                <div class="overed"
                    v-if="overed">
                    <div class="q-pa-xs">
                        <div class="q-gutter-xs row">
                            <q-btn round
                                color="amber"
                                size="sm"
                                icon="mdi-pencil"
                                @click="goToWeaponsForm" />
                            <q-btn round
                                color="red"
                                size="sm"
                                icon="mdi-trash-can"
                                @click="showConfirmDeleteDialog" />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
        <q-dialog v-model="delete_confirm"
            persistent>
            <q-card v-if="accountWeapon.weapon">
                <q-card-section class="row items-center">
                    <q-avatar v-if="accountWeapon.weapon.icon"
                        text-color="white">
                        <img :src="accountWeapon.weapon.icon" />
                    </q-avatar>
                    <span class="q-ml-sm">Are you sure to delete <strong>{{ accountWeapon.weapon.name }}</strong>?.</span>
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
                        @click="deleteWeapon" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup lang="ts">
import AccountWeaponModel from '@/classes/models/Account/Weapon/WeaponModel'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWeaponsStore } from '@/stores/weapons/index'

const props = defineProps({
    accountWeapon: { type: AccountWeaponModel, required: true }
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

let accountWeaponIcon = computed(() => {
    if (props.accountWeapon.level != '1' && props.accountWeapon.level != '20' && props.accountWeapon.level != '20+' && props.accountWeapon.level != '40') {
        if (props.accountWeapon.weapon) return props.accountWeapon.weapon.awakened_icon
    } else {
        if (props.accountWeapon.weapon) return props.accountWeapon.weapon.icon
    }
})

let deleteWeapon = async () => {
    delete_loading.value = true
    await store$.delete(props.accountWeapon)
    delete_loading.value = false
    delete_confirm.value = false
}

let goToWeaponsForm = () => {
    router.push({ name: 'weapons/edit', params: { id: props.accountWeapon.id } })
}
</script>