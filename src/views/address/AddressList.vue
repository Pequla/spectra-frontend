<script lang="ts" setup>
import DataTable from '@/components/DataTable.vue';
import Navigation from '@/components/Navigation.vue';
import Search from '@/components/Search.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { AddressModel } from '@/models/address.model';
import { AddressService } from '@/services/address.service';
import { NetworkService } from '@/services/network.service';
import { generateLastReport } from '@/utils';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const logout = useLogout()
const network = ref()
const addresses = ref<AddressModel[]>()
const search = ref<string>('')
const id = Number(route.params.id)

NetworkService.getNetworkById(id)
    .then(rsp => network.value = rsp.data)
    .catch(e => logout())

function loadAddresses() {
    AddressService.getAddresses(id, search.value)
        .then(rsp => addresses.value = rsp.data)
        .catch(e => logout())
}

function isOnline(address: AddressModel): boolean {
    const lastReportDate = new Date(address.lastReportAt);
    const now = new Date();

    const diffInMs = now.getTime() - lastReportDate.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);
    return address.online && diffInMinutes <= (import.meta.env.VITE_DEVICE_TIMEOUT_IN_MIN || 15);
}

onMounted(() => loadAddresses())
</script>

<template>
    <Navigation />
    <div v-if="network">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <RouterLink to="/network">
                        Networks
                    </RouterLink>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {{ network.range }} ({{ network.name }})
                </li>
            </ol>
        </nav>
        <h3>Addresses</h3>
        <Search v-model="search" @change="loadAddresses" />
        <DataTable :data="addresses">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th></th>
                    <th scope="col">Value</th>
                    <th scope="col">Label</th>
                    <th scope="col">Device Name</th>
                    <th scope="col">MAC Address</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody v-if="addresses">
                <tr v-for="address of addresses">
                    <th scope="row">{{ address.addressId }}</th>
                    <td>
                        <div class="d-flex gap-1">
                            <i class="fa-solid fa-plug-circle-exclamation" v-if="address.wol"
                                title="Device will be awoken with the magic packet"></i>
                            <i class="fa-solid fa-bell" v-if="address.notifications"
                                title="Notifications are enabled"></i>
                        </div>
                    </td>
                    <td>{{ address.value }}</td>
                    <td><i>{{ address.label }}</i></td>
                    <td>{{ address.device }}</td>
                    <td>{{ address.mac ? new String(address.mac).toUpperCase() : 'N/A' }}</td>
                    <td>
                        <span v-if="!address.tracking">
                            <i class="fa-solid fa-circle text-secondary"></i> Unknown
                        </span>
                        <span v-else-if="address.lastReportAt && isOnline(address)"
                            :title="generateLastReport(address.lastReportAt)">
                            <i class="fa-solid fa-circle text-success"></i> Online
                        </span>
                        <span v-else :title="generateLastReport(address.lastReportAt)">
                            <i class="fa-solid fa-circle text-danger"></i> Offline
                        </span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <RouterLink class="btn btn-sm btn-success" :to="`/address/${address.addressId}`">
                                <i class="fa-solid fa-pen-to-square"></i> Edit
                            </RouterLink>
                        </div>
                    </td>
                </tr>
            </tbody>
        </DataTable>
    </div>
</template>