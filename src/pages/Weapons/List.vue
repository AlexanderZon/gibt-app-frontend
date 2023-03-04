<template>
    <q-page padding>
        <div class="q-pa-md">
            <div class="q-col-gutter-md row">
                <div class="col-1">
                    <q-card class="weapon-card void text-white"
                        style="">
                        <q-card-section class="row items-center"
                            @click="goToWeaponsForm()">
                            <div>Add Weapon</div>
                        </q-card-section>
                    </q-card>
                </div>
                <div class="col-1"
                    v-for="(account_weapon, index) in weapons">
                    <WeaponCard :account-weapon="account_weapon"></WeaponCard>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useWeaponsStore } from '@/stores/weapons/index'
import { useRouter } from 'vue-router'
import WeaponCard from './List/WeaponCard.vue';
import AccountWeaponModel from '@/classes/models/Account/Weapon/WeaponModel';

const store$ = useWeaponsStore()
const router = useRouter()

let loading = ref(false)

let goToWeaponsForm = (weapon_id?: number) => {
    if (weapon_id) {
        router.push({ name: 'weapons/edit', params: { id: weapon_id } })
    } else {
        router.push({ name: 'weapons/create' })
    }
}

let weapons = computed(() => {
    return store$.account_weapons.sort((a: AccountWeaponModel, b: AccountWeaponModel): number => {
        if (a.weapon && b.weapon) {
            if (a.weapon.rarity > b.weapon.rarity) return -1
            else if (a.weapon.rarity < b.weapon.rarity) return 1
            else {
                if (a.level > b.level) return -1
                else if (a.level < b.level) return 1
                else return 0
            }
        } else {
            return 0
        }
    })
})

onBeforeMount(async () => {
    await store$.get()
})
</script>