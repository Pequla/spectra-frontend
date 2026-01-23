<script setup lang="ts">
import Navigation from '@/components/Navigation.vue';
import { AuthService } from '@/services/auth.service';
import { MainService } from '@/services/main.service';
import { showLoading } from '@/utils';
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref<string>()
const password = ref<string>()

const router = useRouter()

function doLogin() {
    if (username.value == undefined || username.value == '') {
        Swal.fire('Korisnicko ime ne sme biti prazno')
        return
    }

    if (password.value == undefined || password.value == '') {
        alert('Lozinka ne sme biti prazna')
        return
    }

    showLoading()
    MainService.login(username.value, password.value)
        .then(rsp => {
            AuthService.saveAuth(rsp.data)
            router.push({
                path: '/'
            })
            Swal.close()
        })
        .catch(e => alert(e.response.data.message))
}
</script>

<template>
    <Navigation />
    <div class="mx-auto text-center mt-3">
        <h1 class="h3">SPECTRA<br>NETWORK MANAGER</h1>
    </div>
    <form v-on:submit.prevent="doLogin" class="login">
        <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input type="text" class="form-control" id="username" v-model="username">
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input type="password" class="form-control" id="password" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">
            Login now
        </button>
    </form>
</template>

<style>
    .login {
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }
</style>