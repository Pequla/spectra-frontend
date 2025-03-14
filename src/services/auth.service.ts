import type { AuthModel } from "@/models/auth.model";

export class AuthService {
    static saveAuth(model: AuthModel) {
        localStorage.clear()
        localStorage.setItem('auth', JSON.stringify(model))
    }

    static getAuth(): AuthModel {
        const auth = localStorage.getItem('auth')
        if (auth == undefined)
            throw new Error('NO_LOGIN_DATA')

        return JSON.parse(auth)
    }

    static getAccessToken(): string {
        return this.getAuth().access
    }

    static getRefreshToken(): string {
        return this.getAuth().refresh
    }

    static getName(): string {
        return this.getAuth().name
    }

    static hasAuth(): boolean {
        return localStorage.getItem('auth') != undefined
    }

    static clearAuth() {
        localStorage.clear()
    }
}