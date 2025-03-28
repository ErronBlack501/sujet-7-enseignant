<template>
  <div class="about container">
    <section class="about-section">
      <h1>À propos d'ACME</h1>
      <p class="lead">
        ACME est une plateforme innovante dédiée à la gestion efficace des enseignants et de leurs activités pédagogiques.
      </p>
      
      <div class="about-content">
        <div class="about-card">
          <h2>Notre Mission</h2>
          <p>
            Faciliter la gestion administrative des établissements d'enseignement en fournissant des outils modernes et intuitifs pour le suivi des enseignants.
          </p>
        </div>

        <div class="about-card">
          <h2>Nos Valeurs</h2>
          <ul>
            <li>Excellence pédagogique</li>
            <li>Innovation continue</li>
            <li>Simplicité d'utilisation</li>
            <li>Support réactif</li>
          </ul>
        </div>

        <div class="about-card">
          <h2>Fonctionnalités Clés</h2>
          <ul>
            <li>Gestion des profils enseignants</li>
            <li>Suivi des heures de travail</li>
            <li>Calcul automatique des rémunérations</li>
            <li>Génération de rapports</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about {
  padding: 0;
}

.about-section h1 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-align: center;
}

.lead {
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
}

.about-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.about-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.about-card h2 {
  color: var(--text-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.about-card ul {
  list-style-type: none;
  padding: 0;
}

.about-card li {
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-color);
}

.about-card li:last-child {
  border-bottom: none;
}
</style>
