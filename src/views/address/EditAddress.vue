<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { MainService } from '@/services/main.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const address = ref()
const logout = useLogout()
const route = useRoute()
const router = useRouter()

MainService.useAxios(`/address/${route.params.id}`)
    .then(rsp => address.value = rsp.data)
    .catch(e => logout())

async function updateAddress() {
    MainService.useAxios(`/address/${route.params.id}`, 'put', address.value)
        .then(rsp => router.push(`/network/${address.value.networkId}/address`))
        .catch(e => logout())
}
</script>

<template>
    <Navigation />
    <nav aria-label="breadcrumb" v-if="address">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/network">
                    Networks
                </RouterLink>
            </li>
            <li class="breadcrumb-item">
                <RouterLink :to="`/network/${address.networkId}/address`">
                    Network ID {{ address.networkId }}
                </RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                {{ address.value }}
            </li>
        </ol>
    </nav>
    <h1 class="h3 mt-3">Edit address:</h1>
    <form v-on:submit.prevent="updateAddress" v-if="address">
        <div class="mb-3">
            <label for="id" class="form-label">ID:</label>
            <input type="text" class="form-control" id="id" v-model="address.addressId" disabled>
        </div>
        <div class="mb-3">
            <label for="value" class="form-label">Value:</label>
            <input type="text" class="form-control" id="value" v-model="address.value" disabled>
        </div>
        <div class="mb-3">
            <label for="first" class="form-label">Label:</label>
            <input type="text" class="form-control" id="first" v-model="address.label">
        </div>
        <div class="mb-3">
            <label for="first" class="form-label">Device Name:</label>
            <input type="text" class="form-control" id="first" v-model="address.device">
        </div>
        <div class="mb-3">
            <label for="first" class="form-label">MAC Address:</label>
            <input type="text" class="form-control" id="first" v-model="address.mac">
        </div>
        <div class="mb-3">
            <label for="first" class="form-label">Note:</label>
            <input type="text" class="form-control" id="first" v-model="address.note">
        </div>
        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="track" v-model="address.tracking">
            <label class="form-check-label" for="track">
                Enable activity tracking for this device
            </label>
        </div>
        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="noti" v-model="address.notifications">
            <label class="form-check-label" for="noti">
                Enable notifications for this device
            </label>
        </div>
        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="wol" v-model="address.wol">
            <label class="form-check-label" for="wol">
                Enable automatic Wake On Lan feature for this device
            </label>
        </div>
        <div class="mb-3">
            <label for="updated" class="form-label">Updated:</label>
            <input type="text" class="form-control" id="updated"
                :value="new Date(address.updatedAt ?? address.createdAt).toLocaleString('sr-RS')" disabled>
        </div>
        <button type="submit" class="btn btn-primary">
            <i class="fa-solid fa-floppy-disk"></i> Save
        </button>
    </form>
</template>