export interface AddressModel {
    addressId: number
    networkId: number
    value: string
    label: string
    device: string
    mac: string
    note: string
    online: boolean
    verified: boolean
    token: string
    notifications: boolean
    wol: boolean
    tracking: boolean
    lastReportAt: string
    createdAt: string
    updatedAt: string | null
    deletedAt: string | null
}