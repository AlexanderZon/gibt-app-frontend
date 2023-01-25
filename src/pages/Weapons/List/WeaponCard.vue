<template>
    <div>
        <q-card class="weapon-card text-white"
            :class="{ 'rarity-5': accountWeapon.weapon.rarity == 5, 'rarity-4': accountWeapon.weapon.rarity == 4 }"
            @mouseover="weaponCardMouseOverEvent"
            @mouseleave="weaponCardMouseLeaveEvent">
            <q-card-section class="row items-center q-pa-none">
                <q-img v-if="accountWeapon.weapon.icon"
                    :src="accountWeapon.weapon.icon">
                    <div class="weapon-name absolute-bottom text-subtitle2 text-center q-pa-none">
                        {{ accountWeapon.weapon.name }}
                    </div>
                </q-img>
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
                            <q-btn round
                                color="blue"
                                size="sm"
                                icon="mdi-playlist-plus" />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
        <q-dialog v-model="delete_confirm"
            persistent>
            <q-card>
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
import { ref } from 'vue'
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