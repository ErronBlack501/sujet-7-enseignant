<template>
  <div class="teacher-list">
    <h3>Liste des enseignants</h3>
    <div class="table-responsive">
      <table class="teacher-table">
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Taux horaire</th>
            <th>Nombre d'heures</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers" :key="teacher.matricule">
            <td>{{ teacher.matricule }}</td>
            <td>{{ teacher.nom }}</td>
            <td>{{ teacher.tauxHoraire }}</td>
            <td>{{ teacher.nombreHeures }}</td>
            <td class="actions">
              <button class="btn btn-edit" @click="$emit('edit', teacher)">
                <i class="bi bi-pencil-square"></i> Modifier
              </button>
              <button class="btn btn-delete" @click="$emit('delete', teacher)">
                <i class="bi bi-trash"></i> Supprimer
              </button>
            </td>
          </tr>
          <tr v-if="teachers.length === 0">
            <td colspan="5" class="no-data">Aucun enseignant trouvé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Teacher } from '@/types/teacher';

defineProps<{
  teachers: Teacher[];
}>();

defineEmits<{
  (e: 'edit', teacher: Teacher): void;
  (e: 'delete', teacher: Teacher): void;
}>();
</script>

<style scoped>
.teacher-list {
  margin-top: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.teacher-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.teacher-table th,
.teacher-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.teacher-table th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.btn-edit {
  background-color: #2196F3;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.no-data {
  text-align: center;
  color: #666;
  font-style: italic;
}
</style>
