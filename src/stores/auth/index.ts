import { defineStore } from "pinia"
import UserModel from '@/classes/models/User/UserModel'
import AccountModel from '@/classes/models/Account/AccountModel'
import LoginModel from "@/classes/models/Auth/Login/LoginModel"
import SignupModel from "@/classes/models/Auth/Signup/SignupLogin"
import Http from "@/packages/http"

const base = `auth`

export const useAuthStore = defineStore('auth', {
    state: () => ({
        has_login: false as Boolean,
        user: null as UserModel | null,
        accounts: [] as AccountModel[],
    }),
    actions: {
        async csrf() {
            const response = await window.api.get(`/sanctum/csrf-cookie`)
        },
        async check() {
            const response = await Http.get(`${base}/check`)
            if (response.data.user != null) {
                this.user = new UserModel(response.data.user)
            }
        },
        async login(login: LoginModel) {
            const response = await Http.post(`${base}/login`, login)
            if (response.data.user != null) {
                this.user = new UserModel(response.data.user)
            }
        },
        async signup(signup: SignupModel) {
            const response = await Http.post(`${base}/signup`, signup)
            if (response.data.user != null) {
                this.user = new UserModel(response.data.user)
            }
        },
        async logout() {
            const response = await Http.post(`${base}/logout`)
            this.user = null
        },
    },
})