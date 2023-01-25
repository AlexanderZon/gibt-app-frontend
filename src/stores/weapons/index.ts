import { defineStore } from "pinia"
import Http from "@/packages/http"
import AccountWeaponModel from "@/classes/models/Account/Weapon/WeaponModel"
import AccountWeaponInterface from "@/classes/models/Account/Weapon/WeaponInterface"
import WeaponModel from "@/classes/models/Weapon/WeaponModel"
import WeaponInterface from "@/classes/models/Weapon/WeaponInterface"

const base = `account/weapons`

export const useWeaponsStore = defineStore('weapons', {
    state: () => ({
        weapons: [] as WeaponModel[],
        account_weapons: [] as AccountWeaponModel[],
    }),
    actions: {
        async get() {
            const response = await Http.get(`${base}`)
            if (response.data.list) {
                this.account_weapons = []
                response.data.list.forEach((element: AccountWeaponInterface) => {
                    this.account_weapons.unshift(new AccountWeaponModel(element))
                })
            }
        },
        async create() {
            const response = await Http.get(`${base}/create`)
            this.fillFormData(response)
            return new AccountWeaponModel(response.data.model)
        },
        async store(model: AccountWeaponModel) {
            const response = await Http.post(`${base}`, model)
            this.account_weapons.unshift(new AccountWeaponModel(response.data))
        },
        // async show(model: AccountWeaponModel) {
        //     const response = await Http.get(`${base}/${model.id}`, model)
        // },
        async edit(model: AccountWeaponModel) {
            const response = await Http.get(`${base}/${model.id}/edit`, model)
            this.fillFormData(response)
            return new AccountWeaponModel(response.data.model)
        },
        async update(model: AccountWeaponModel) {
            const response = await Http.put(`${base}/${model.id}`, model)
            this.updateStoreElement(new AccountWeaponModel(response.data.data))
        },
        async delete(model: AccountWeaponModel) {
            const response = await Http.delete(`${base}/${model.id}`, model)
            this.deleteStoreElement(new AccountWeaponModel(response.data.data))
        },
        updateStoreElement(weapon: AccountWeaponModel) {
            let element: AccountWeaponModel | undefined = this.account_weapons.find((element: AccountWeaponModel) => {
                return (element.id == weapon.id)
            })
            if (element) {
                let index: number = this.account_weapons.indexOf(element)
                if (index > -1) this.account_weapons.splice(index, 1, weapon)
            }
        },
        deleteStoreElement(weapon: AccountWeaponModel) {
            let element: AccountWeaponModel | undefined = this.account_weapons.find((element: AccountWeaponModel) => {
                return (element.id == weapon.id)
            })
            if (element) {
                let index: number = this.account_weapons.indexOf(element)
                if (index > -1) this.account_weapons.splice(index, 1)
            }
        },
        fillFormData(response: any) {
            this.weapons = response.data.form.weapons.map((weapon: WeaponInterface) => {
                return new WeaponModel(weapon)
            })
        }
    },
})