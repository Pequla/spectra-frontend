<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import Search from '@/components/Search.vue';
import { useLogout } from '@/hooks/logout.hook';
import { MainService } from '@/services/main.service';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const logout = useLogout()
const network = ref()
const addresses = ref()
const search = ref<string>('')

MainService.useAxios(`/network/${route.params.id}`)
    .then(rsp => network.value = rsp.data)
    .catch(e => logout())

function loadAddresses() {
    MainService.useAxios(`/network/${route.params.id}/address?search=${search.value}`)
        .then(rsp => addresses.value = rsp.data)
        .catch(e => logout())
}

function isOnline(address: any): boolean {
    const lastReportDate = new Date(address.lastReportAt);
    const now = new Date();

    const diffInMs = now.getTime() - lastReportDate.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);
    return address.online && diffInMinutes <= 15;
}

function generateLastReport(iso: string | null) {
    if (iso == null)
        return 'Never reported'

    return new Date(iso).toLocaleString('sr-RS')
}

onMounted(() => loadAddresses())
</script>

<template>
    <Navigation />
    <div v-if="network">
        <h3>Network {{ network.range }} ({{ network.name }})</h3>
        <Search v-model="search" @change="loadAddresses" />
        <table class="table table-striped table-hover">
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
            <tfoot v-else>
                <tr>
                    Processing table data... Please wait!
                </tr>
            </tfoot>
        </table>
    </div>
</template>