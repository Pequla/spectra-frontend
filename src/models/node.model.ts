export interface NodeModel {
    nodeId: number
    name: string
    address: string
    lastReportAt: string
    network: {
        networkId: number
        range: string
        name: string
        location:{
            locationId: number,
            name: string
        }
    }
}