<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">
        <i class="fa-solid fa-hexagon-nodes-bolt"></i> Spectra
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="AuthService.hasAuth()">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/network" active-class="active">
              <i class="fa-solid fa-network-wired"></i> Networks
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/location" active-class="active">
              <i class="fa-solid fa-location-dot"></i> Locations
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/node" active-class="active">
              <i class="fa-solid fa-hexagon-nodes"></i> Nodes
            </RouterLink>
          </li>
          <li class="nav-item">
            <button class="nav-link" type="button" @click="logout">
              <i class="fa-solid fa-door-open"></i> Logout
            </button>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/login">
              <i class="fa-solid fa-arrow-right-to-bracket"></i> Login
            </RouterLink>
          </li>
        </ul>
        <span class="navbar-text" v-if="AuthService.hasAuth()">
          <i class="fa-solid fa-user"></i> {{ AuthService.getName() }}
        </span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useLogout } from '@/hooks/logout.hook';
import { AuthService } from '@/services/auth.service'

const logout = useLogout()
</script>