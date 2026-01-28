import { MainService } from "./main.service";

export class LocationService {
    static async getLocations(search: string = '') {
        return await MainService.useAxios(`/location?search=${search}`)
    }

    static async getLocationById(id: number) {
        return await MainService.useAxios(`/location/${id}`)
    }

    static async createLocation(data: any) {
        return await MainService.useAxios('/location', 'post', data)
    }

    static async updateLocation(id: number, data: any) {
        return await MainService.useAxios(`/location/${id}`, 'put', data)
    }

    static async deleteLocation(id: number) {
        return await MainService.useAxios(`/location/${id}`, 'delete')
    }
}