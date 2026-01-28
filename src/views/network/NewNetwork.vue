<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { LocationService } from '@/services/location.service';
import { NetworkService } from '@/services/network.service';
import { showConfirm, showLoading } from '@/utils';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const network = ref({
    name: '',
    range: '',
    locationId: 0
})
const logout = useLogout()
const router = useRouter()
const locations = ref()

async function createNetwork() {
    showConfirm('Are you sure you want to create a network?', () => {
        showLoading()
        NetworkService.createNetwork(network.value)
            .then(rsp => router.push('/network'))
            .catch(e => logout())
            .finally(() => Swal.close())
    })
}

onMounted(() => {
    showLoading()
    LocationService.getLocations()
        .then(rsp => {
            locations.value = rsp.data
            network.value.locationId = rsp.data[0].locationId
        })
        .catch(e => logout())
        .finally(() => Swal.close())
})
</script>

<template>
    <Navigation />
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/network">
                    Networks
                </RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                New
            </li>
        </ol>
    </nav>
    <h1 class="h3">New Network</h1>
    <form v-on:submit.prevent="createNetwork">
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
        <button type="submit" class="btn btn-primary">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
        <div class="card text-dark bg-warning mt-3">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fa-solid fa-triangle-exclamation"></i> Warning
                </h5>
                <p class="card-text">
                    Creating a new network can take a bit of time in order to generate all addresses in CIRD range!
                    Thank you for beeing patient.
                </p>
            </div>
        </div>
    </form>
</template>