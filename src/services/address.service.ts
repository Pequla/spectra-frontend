import { MainService } from "./main.service";

export class AddressService {
    static async getAddresses(id: number, search: string = "") {
        return await MainService.useAxios(`/network/${id}/address?search=${search}`)
    }

    static async getAddressById(id: number) {
        return await MainService.useAxios(`/address/${id}`)
    }

    static async updateAddress(id: number, data: any) {
        return await MainService.useAxios(`/address/${id}`, 'put', data)
    }
}