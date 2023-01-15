import { AppAuthCheckResponseInterface } from "@/classes/interfaces/Auth/Auth"
import { AxiosError, AxiosResponse } from "axios"

class Login {
    email: string
    password: string
}

class Signup {
    name: string
    email: string
    password: string
}

let check = async () => {
    return window.api.get('/api/app/auth/check')
}
let login = async (user: Login) => {
    return window.api.post('/api/app/auth/login', user)
}

let signup = async (user: Signup) => {
    return window.api.post('/api/app/auth/signup', user)
}

let logout = async () => {
    return window.api.post('/api/app/auth/logout')
}

let csrf = async () => {
    return window.api.get('/sanctum/csrf-cookie')
}

export default {
    Signup,
    Login,
    check,
    login,
    signup,
    logout,
    csrf
}