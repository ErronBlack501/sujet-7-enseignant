<template>
  <nav class="navbar">
    <div class="container">
      <router-link to="/" class="logo">ACME</router-link>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Accueil</router-link>
        <router-link to="/teachers" class="nav-link">Enseignant</router-link>
        <router-link to="/about" class="nav-link">À propos</router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
  display: flex;
  align-items: center;
}

.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  justify-content: flex-start;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--primary-color);
}

.router-link-active {
  color: var(--primary-color);
}
</style>
