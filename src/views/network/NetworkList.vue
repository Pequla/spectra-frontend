<script lang="ts" setup>
import DataTable from '@/components/DataTable.vue';
import Navigation from '@/components/Navigation.vue';
import Search from '@/components/Search.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { NetworkModel } from '@/models/network.model';
import { NetworkService } from '@/services/network.service';
import { showConfirm } from '@/utils';
import { onMounted, ref } from 'vue';

const logout = useLogout()
const networks = ref<NetworkModel[]>()
const search = ref<string>('')

function loadNetworks() {
    NetworkService.getNetworks(search.value)
        .then(rsp => networks.value = rsp.data)
        .catch(e => logout())
}

function deleteNetwork(id: number) {
    showConfirm('Are you sure you want to delete network?', () => {
        NetworkService.deleteNetwork(id)
            .then(rsp => {
                networks.value = networks.value!.filter(n => n.networkId !== id)
            })
            .catch(e => logout())
    })
}

onMounted(() => loadNetworks())
</script>

<template>
    <Navigation />
    <h3>Networks</h3>
    <Search v-model="search" @change="loadNetworks">
        <div class="btn-group">
            <RouterLink class="btn btn-primary" to="/network/new">
                <i class="fa-solid fa-plus"></i> Add network
            </RouterLink>
        </div>
    </Search>
    <DataTable :data="networks">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">CIRD</th>
                <th scope="col">Name</th>
                <th scope="col">Location</th>
                <th scope="col">Updated At</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="network of networks">
                <th scope="row">{{ network.networkId }}</th>
                <td>{{ network.range }}</td>
                <td>{{ network.name }}</td>
                <td>{{ network.location.name }}</td>
                <td>{{ new Date(network.updatedAt ? network.updatedAt : network.createdAt).toLocaleString('sr-RS') }}
                </td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/network/${network.networkId}/address`" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-desktop"></i>
                        </RouterLink>
                        <RouterLink :to="`/network/${network.networkId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button class="btn btn-sm btn-danger" v-on:click="deleteNetwork(network.networkId)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </DataTable>
</template>