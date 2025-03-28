<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>ACME</h3>
          <p>Système de Gestion des Enseignants</p>
          <p>Simplifiez la gestion administrative de vos enseignants</p>
        </div>
        <div class="footer-section">
          <h3>Contact Support</h3>
          <p>Email: support@acme.com</p>
          <p>Tél: +123 456 789</p>
          <p>Lun-Ven: 9h-18h</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} ACME. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.footer-section p {
  margin-bottom: 0.5rem;
}

.footer-link {
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.footer-link:hover {
  color: var(--primary-color);
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
