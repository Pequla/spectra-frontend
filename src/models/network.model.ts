import type { LocationModel } from "./location.model"

export interface NetworkModel {
    networkId: number
    name: string
    range: string
    locationId: number
    location: LocationModel
    createdAt: string
    updatedAt: string | null
    deletedAt: string | null
}