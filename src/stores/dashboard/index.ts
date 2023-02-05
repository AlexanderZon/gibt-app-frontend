import { defineStore } from "pinia"
import Http from "@/packages/http"
import AccountCharacterModel from "@/classes/models/Account/Characters/CharacterModel"
import AccountCharacterInterface from "@/classes/models/Account/Characters/CharacterInterface"
import CharacterModel from "@/classes/models/Characters/CharacterModel"
import CharacterInterface from "@/classes/models/Characters/CharacterInterface"
import AccountWeaponModel from "@/classes/models/Account/Weapon/WeaponModel"
import AccountWeaponInterface from "@/classes/models/Account/Weapon/WeaponInterface"

const base = `account/dashboard`

export const useDashboardStore = defineStore('characters', {
    state: () => ({
        // characters: [] as CharacterModel[],
        // account_weapons: [] as AccountWeaponModel[],
        // account_characters: [] as AccountCharacterModel[],
    }),
    actions: {
        async get() {
            const response = await Http.get(`${base}`)
            console.log('Dashboard:', response.data)
        },
    },
})