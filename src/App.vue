<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <div class="container">
    <RouterView />
    <footer class="mt-3 text-center print-hide">
      &copy; {{ year }} Spectra: Network Management Application
    </footer>
  </div>
</template>