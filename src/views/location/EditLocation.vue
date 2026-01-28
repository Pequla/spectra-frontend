<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { LocationModel } from '@/models/location.model';
import { LocationService } from '@/services/location.service';
import { showLoading } from '@/utils';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const location = ref<LocationModel>()
const logout = useLogout()
const route = useRoute()
const router = useRouter()

async function updateLocation() {
    LocationService.updateLocation(Number(route.params.id), location.value)
        .then(rsp => router.push('/location'))
        .catch(e => logout())
}

onMounted(() => {
    showLoading()
    LocationService.getLocationById(Number(route.params.id))
        .then(rsp => location.value = rsp.data)
        .catch(e => logout())
        .finally(() => Swal.close())
})
</script>

<template>
    <Navigation />
    <nav aria-label="breadcrumb" v-if="location">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/location">
                    Locations
                </RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {{ location.name }}
            </li>
        </ol>
    </nav>
    <h1 class="h3 mt-3">Edit location:</h1>
    <form v-on:submit.prevent="updateLocation" v-if="location">
        <div class="mb-3">
            <label for="id" class="form-label">ID:</label>
            <input type="text" class="form-control" id="id" v-model="location.locationId" disabled>
        </div>
        <div class="mb-3">
            <label for="index" class="form-label">Name:</label>
            <input type="text" class="form-control" id="index" v-model="location.name">
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated:</label>
            <input type="text" class="form-control" id="updated"
                :value="new Date(location.updatedAt ?? location.createdAt).toLocaleString('sr-RS')" disabled>
        </div>
        <button type="submit" class="btn btn-primary">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </form>
</template>