<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { LocationService } from '@/services/location.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const location = ref({
    name: ''
})
const logout = useLogout()
const router = useRouter()

async function createLocation() {
    LocationService.createLocation(location.value)
        .then(rsp => router.push('/location'))
        .catch(e => logout())
}
</script>

<template>
    <Navigation />
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/location">
                    Locations
                </RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                New
            </li>
        </ol>
    </nav>
    <h1 class="h3 mt-3">New location:</h1>
    <form v-on:submit.prevent="createLocation">
        <div class="mb-3">
            <label for="index" class="form-label">Name:</label>
            <input type="text" class="form-control" id="index" v-model="location.name">
        </div>
        <button type="submit" class="btn btn-primary">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </form>
</template>