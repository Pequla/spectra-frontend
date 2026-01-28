<script lang="ts" setup>
import DataTable from '@/components/DataTable.vue';
import Navigation from '@/components/Navigation.vue';
import Search from '@/components/Search.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { LocationModel } from '@/models/location.model';
import { LocationService } from '@/services/location.service';
import { onMounted, ref } from 'vue';

const logout = useLogout()
const locations = ref<LocationModel[]>()
const search = ref<string>('')

function loadLocations() {
    LocationService.getLocations(search.value)
        .then(rsp => locations.value = rsp.data)
        .catch(e => logout())
}

function deleteLocation(id: number) {
    if (!confirm('Are you sure you want to delete location')) {
        return
    }

    LocationService.deleteLocation(id)
        .then(rsp => {
            locations.value = locations.value!.filter(n => n.locationId !== id)
        })
        .catch(e => logout())
}

onMounted(() => loadLocations())
</script>

<template>
    <Navigation />
    <h3>Locations</h3>
    <Search v-model="search" @change="loadLocations">
        <div class="btn-group">
            <RouterLink class="btn btn-primary" to="/location/new">
                <i class="fa-solid fa-plus"></i> Add location
            </RouterLink>
        </div>
    </Search>
    <DataTable :data="locations">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="location of locations">
                <th scope="row">{{ location.locationId }}</th>
                <td>{{ location.name }}</td>
                <td>{{ new Date(location.createdAt).toLocaleString('sr-RS') }}</td>
                <td>{{ location.updatedAt ? new Date(location.updatedAt).toLocaleString('sr-RS') : 'N/A' }}
                </td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/location/${location.locationId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button class="btn btn-sm btn-danger" v-on:click="deleteLocation(location.locationId)">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </DataTable>
</template>