import { AxiosError } from "axios"
import router from "@/router/router"
import { useAuthStore } from '@/stores/auth/index'

interface Trace {
    class: string
    file: string
    function: string
    line: number
    type: string
}

interface DataException {
    exception: string
    file: string
    line: number
    message: string
    trace: Array<Trace>
}

class Http {
    static base_url: string = '/api/app'

    static get(endpoint: string): Promise<any>;
    static get(endpoint: string, config: any): Promise<any>;
    static get(endpoint: string, config?: any) {
        return window.api.get(`${this.base_url}/${endpoint}`, config).catch((thrown: AxiosError) => {
            this.exceptions(thrown)
        })
    }

    static delete(endpoint: string): Promise<any>;
    static delete(endpoint: string, config: any): Promise<any>;
    static delete(endpoint: string, config?: any) {
        return window.api.delete(`${this.base_url}/${endpoint}`, config).catch((thrown: AxiosError) => {
            this.exceptions(thrown)
        })
    }

    static head(endpoint: string): Promise<any>;
    static head(endpoint: string, config: any): Promise<any>;
    static head(endpoint: string, config?: any) {
        return window.api.head(`${this.base_url}/${endpoint}`, config).catch((thrown: AxiosError) => {
            this.exceptions(thrown)
        })
    }

    static opstions(endpoint: string): Promise<any>;
    static opstions(endpoint: string, config: any): Promise<any>;
    static opstions(endpoint: string, config?: any) {
        return window.api.opstions(`${this.base_url}/${endpoint}`, config).catch((thrown: AxiosError) => {
            this.exceptions(thrown)
        })
    }

    static post(endpoint: string): Promise<any>;
    static post(endpoint: string, data: any): Promise<any>;
    static post(endpoint: string, data: any, config: any): Promise<any>;
    static post(endpoint: string, data?: any, config?: any) {
        return window.api.post(`${this.base_url}/${endpoint}`, data, config).catch((thrown: AxiosError) => {
            this.exceptions(thrown)
        })
    }

    static put(endpoint: string): Promise<any>;
    static put(endpoint: string, data: any): Promise<any>;
    static put(endpoint: string, data: any, config: any): Promise<any>;
    static put(endpoint: string, data?: any, config?: any) {
        return window.api.put(`${this.base_url}/${endpoint}`, data, config).catch((thrown: AxiosError) => {
            this.exceptions(thrown)
        })
    }

    static patch(endpoint: string): Promise<any>;
    static patch(endpoint: string, data: any): Promise<any>;
    static patch(endpoint: string, data: any, config: any): Promise<any>;
    static patch(endpoint: string, data?: any, config?: any) {
        return window.api.patch(`${this.base_url}/${endpoint}`, data, config).catch((thrown: AxiosError) => {
            this.exceptions(thrown)
        })
    }

    static exceptions(thrown: AxiosError) {
        if (thrown.response?.status == 500) {
            let data: DataException = <DataException>thrown.response?.data
            if (data.exception == 'App\\Exceptions\\API\\App\\Auth\\Signup\\EmailAlreadyExistsException') {
                throw new Error('EmailAlreadyExistsException', { cause: thrown })
            } else if (data.exception == 'App\\Exceptions\\API\\App\\Accounts\\Characters\\CharacterDoNotBelongsToActualAccountException') {
                throw new Error('CharacterDoNotBelongsToActualAccountException', { cause: thrown })
            } else {
                throw new Error('Server Error', { cause: thrown })
            }
        } else if (thrown.response?.status == 401) {
            const $store = useAuthStore()
            $store.user = null
            router.push({ name: 'login' })
            throw new Error('Unauthorized', { cause: thrown })
        } else {
            throw new Error('Server Error', { cause: thrown })
        }
    }
}

export default Http