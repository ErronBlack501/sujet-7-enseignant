<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1>Bienvenue sur ACME</h1>
        <p>Plateforme de gestion des enseignants</p>
        <router-link to="/teachers" class="btn btn-primary">Gérer les enseignants</router-link>
      </div>
    </section>

    <section class="features container">
      <div class="feature-card">
        <i class="bi bi-people-fill"></i>
        <h3>Gestion des Enseignants</h3>
        <p>Gérez facilement les informations de vos enseignants</p>
      </div>
      <div class="feature-card">
        <i class="bi bi-clock-fill"></i>
        <h3>Suivi des Heures</h3>
        <p>Suivez les heures de travail et les taux horaires</p>
      </div>
      <div class="feature-card">
        <i class="bi bi-graph-up"></i>
        <h3>Rapports</h3>
        <p>Générez des rapports détaillés sur les activités</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, #2c3e50 100%);
  color: white;
  padding: 5rem 0 4rem;
  text-align: center;
  margin: -2rem 0 3rem;
  position: relative;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card i {
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: var(--text-color);
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
}
</style>
