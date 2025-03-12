import { AuthService } from "@/services/auth.service";
import { useRouter } from "vue-router";

export function useLogout() {
    const router = useRouter()

    const logout = () => {
        AuthService.clearAuth()
        router.push({
            path: '/login'
        })
    }

    return logout
}