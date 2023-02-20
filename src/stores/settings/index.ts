import { defineStore } from "pinia"
import Http from "@/packages/http"
import AccountModel from "@/classes/models/Account/AccountModel"
import AccountInterface from "@/classes/models/Account/AccountInterface"
import UserModel from "@/classes/models/User/UserModel"

const base = `account/settings`

export const useSettingsStore = defineStore('settings ', {
    state: () => ({
        accounts: [] as AccountModel[],
        user: {} as UserModel,
    }),
    actions: {
        async get() {
            const response = await Http.get(`${base}`)
            this.fillData(response)
        },
        async storeAccount(model: AccountModel) {
            const response = await Http.post(`${base}/accounts`, model)
            this.accounts.push(new AccountModel(response.data))
        },
        async updateAccount(model: AccountModel) {
            const response = await Http.put(`${base}/accounts/${model.id}`, model)
            let element = this.accounts.find(account => account.id == response.data.id)
            if (element) {
                let index = this.accounts.indexOf(element)
                this.accounts.splice(index, 1, new AccountModel(response.data))
            }
        },
        async deleteAccount(model: AccountModel) {
            const response = await Http.delete(`${base}/accounts/${model.id}`)
            let element = this.accounts.find(account => account.id == response.data.id)
            if (element) {
                let index = this.accounts.indexOf(element)
                this.accounts.splice(index, 1)
            }
        },
        async setActiveAccount(model: AccountModel) {
            const response = await Http.put(`${base}/accounts/active/${model.id}`)
            this.fillData(response)
        },
        fillData(response: any) {
            if (response.data.accounts) {
                this.accounts = []
                response.data.accounts.forEach((element: AccountInterface) => {
                    this.accounts.push(new AccountModel(element))
                })
            }
            if (response.data.user) {
                this.user = new UserModel(response.data.user)
            }
        }
    },
})