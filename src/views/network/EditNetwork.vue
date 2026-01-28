<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { LocationModel } from '@/models/location.model';
import type { NetworkModel } from '@/models/network.model';
import { LocationService } from '@/services/location.service';
import { NetworkService } from '@/services/network.service';
import { showConfirm, showLoading } from '@/utils';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const network = ref<NetworkModel>()
const locations = ref<LocationModel[]>()
const logout = useLogout()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

async function updateNetwork() {
    showConfirm('Are you sure you want to update the network?', () => {
        NetworkService.updateNetwork(id, network.value)
            .then(rsp => router.push('/network'))
            .catch(e => logout())
    })
}

onMounted(async () => {
    try {
        showLoading()
        const net = await NetworkService.getNetworkById(id)
        const loc = await LocationService.getLocations()
        network.value = net.data
        locations.value = loc.data
    }
    catch {
        logout()
    } finally {
        Swal.close()
    }
})
</script>

<template>
    <Navigation />
    <nav aria-label="breadcrumb" v-if="network">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/network">
                    Networks
                </RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {{ network.range }}
            </li>
        </ol>
    </nav>
    <h1 class="h3 mt-3">Edit Network</h1>
    <form v-on:submit.prevent="updateNetwork" v-if="network">
        <div class="mb-3">
            <label for="id" class="form-label">ID:</label>
            <input type="text" class="form-control" id="id" v-model="network.networkId" disabled>
        </div>
        <div class="mb-3">
            <label for="index" class="form-label">Name:</label>
            <input type="text" class="form-control" id="index" v-model="network.name">
        </div>
        <div class="mb-3">
            <label for="first" class="form-label">Range:</label>
            <input type="text" class="form-control" id="first" v-model="network.range">
        </div>
        <div class="mb-3">
            <label for="location" class="form-label">Location:</label>
            <select class="form-select" id="location" v-model="network.locationId">
                <option v-for="loc in locations" :value="loc.locationId">{{ loc.name }}</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated:</label>
            <input type="text" class="form-control" id="updated"
                :value="new Date(network.updatedAt ?? network.createdAt).toLocaleString('sr-RS')" disabled>
        </div>
        <button type="submit" class="btn btn-primary">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </form>
</template>