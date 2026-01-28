import { MainService } from "./main.service";

export class NodeService {
    static async getNodes(search: string = '') {
        return await MainService.useAxios(`/node?search=${search}`)
    }

    static async getNodeById(id: number) {
        return await MainService.useAxios(`/node/${id}`)
    }

    static async retrieveTerminalContent(id: number) {
        return await MainService.useAxios(`/node/${id}/terminal`)
    }

    static async sendTerminalCommand(id: number, value: string) {
        return await MainService.useAxios(`/node/${id}/terminal`, 'post', { value })
    }
}