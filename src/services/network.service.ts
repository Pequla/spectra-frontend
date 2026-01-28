import { MainService } from "./main.service";

export class NetworkService {
    static async getNetworks(search: string = '') {
        return await MainService.useAxios(`/network?search=${search}`)
    }

    static async getNetworkById(id: number) {
        return await MainService.useAxios(`/network/${id}`)
    }

    static async createNetwork(data: any) {
        return await MainService.useAxios('/network', 'post', data)
    }

    static async updateNetwork(id: number, data: any) {
        return await MainService.useAxios(`/network/${id}`, 'put', data)
    }

    static async deleteNetwork(id: number) {
        return await MainService.useAxios(`/network/${id}`, 'delete')
    }
}