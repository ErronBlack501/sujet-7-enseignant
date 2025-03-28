<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="app-wrapper">
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
:root {
  --primary-color: #4CAF50;
  --text-color: #2c3e50;
  --background-color: #f8f9fa;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  min-height: 100vh;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  margin-top: 64px; /* Height of the navbar */
  padding: 2rem 0;
  min-height: calc(100vh - 64px);
}
</style>
