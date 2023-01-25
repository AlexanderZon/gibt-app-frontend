import { defineStore } from "pinia"
import Http from "@/packages/http"
import AccountCharacterModel from "@/classes/models/Account/Characters/CharacterModel"
import AccountCharacterInterface from "@/classes/models/Account/Characters/CharacterInterface"
import CharacterModel from "@/classes/models/Characters/CharacterModel"
import CharacterInterface from "@/classes/models/Characters/CharacterInterface"
import AccountWeaponModel from "@/classes/models/Account/Weapon/WeaponModel"
import AccountWeaponInterface from "@/classes/models/Account/Weapon/WeaponInterface"

const base = `account/characters`

export const useCharactersStore = defineStore('characters', {
    state: () => ({
        characters: [] as CharacterModel[],
        account_weapons: [] as AccountWeaponModel[],
        account_characters: [] as AccountCharacterModel[],
    }),
    actions: {
        async get() {
            const response = await Http.get(`${base}`)
            if (response.data.list) {
                this.account_characters = []
                response.data.list.forEach((element: AccountCharacterInterface) => {
                    this.account_characters.unshift(new AccountCharacterModel(element))
                })
            }
        },
        async create() {
            const response = await Http.get(`${base}/create`)
            this.fillFormData(response)
            return new AccountCharacterModel(response.data.model)
        },
        async store(model: AccountCharacterModel) {
            const response = await Http.post(`${base}`, model)
            this.account_characters.unshift(new AccountCharacterModel(response.data))
        },
        // async show(model: AccountCharacterModel) {
        //     const response = await Http.get(`${base}/${model.id}`, model)
        //     console.log('show: ', response.data)
        // },
        async edit(model: AccountCharacterModel) {
            const response = await Http.get(`${base}/${model.id}/edit`, model)
            this.fillFormData(response)
            return new AccountCharacterModel(response.data.model)
        },
        async update(model: AccountCharacterModel) {
            const response = await Http.put(`${base}/${model.id}`, model)
            this.updateStoreElement(new AccountCharacterModel(response.data.data))
        },
        async delete(model: AccountCharacterModel) {
            const response = await Http.delete(`${base}/${model.id}`, model)
            this.deleteStoreElement(new AccountCharacterModel(response.data.data))
        },
        updateStoreElement(character: AccountCharacterModel) {
            let element: AccountCharacterModel | undefined = this.account_characters.find((element: AccountCharacterModel) => {
                return (element.id == character.id)
            })
            if (element) {
                let index: number = this.account_characters.indexOf(element)
                if (index > -1) this.account_characters.splice(index, 1, character)
            }
        },
        deleteStoreElement(character: AccountCharacterModel) {
            console.log('deleting from store: ', character)
            let element: AccountCharacterModel | undefined = this.account_characters.find((element: AccountCharacterModel) => {
                return (element.id == character.id)
            })
            if (element) {
                let index: number = this.account_characters.indexOf(element)
                if (index > -1) this.account_characters.splice(index, 1)
            }
        },
        fillFormData(response: any) {
            this.characters = response.data.form.characters.map((character: CharacterInterface) => {
                return new CharacterModel(character)
            })
            this.account_weapons = response.data.form.account_weapons.map((account_weapon: AccountWeaponInterface) => {
                return new AccountWeaponModel(account_weapon)
            })
        }
    },
})