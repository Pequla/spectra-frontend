<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const network = ref()
const logout = useLogout()
const route = useRoute()
const router = useRouter()
MainService.useAxios(`/network/${route.params.id}`)
    .then(rsp => network.value = rsp.data)
    .catch(e => logout())

const locations = ref()
MainService.useAxios('/location')
    .then(rsp => locations.value = rsp.data)
    .catch(e => logout())

async function updateNetwork() {
    MainService.useAxios(`/network/${route.params.id}`, 'put', network.value)
        .then(rsp => router.push('/network'))
        .catch(e => logout())
}
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
    <h1 class="h3 mt-3">Edit network:</h1>
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