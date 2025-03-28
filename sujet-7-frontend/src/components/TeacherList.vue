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
            <th>Heures</th>
            <th>Prestation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="teacher in teachers" :key="teacher.matricule">
            <td>{{ teacher.matricule }}</td>
            <td>{{ teacher.nom }}</td>
            <td>{{ formatCurrency(teacher.tauxHoraire) }}</td>
            <td>{{ teacher.nombreHeures }}</td>
            <td>{{ formatCurrency(teacher.nombreHeures * teacher.tauxHoraire) }}</td>
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
            <td colspan="6" class="no-data">Aucun enseignant trouvé</td>
          </tr>
        </tbody>
        
        <tfoot v-if="teachers.length > 0">
          <tr class="summary-row">
            <td colspan="4"><strong>Totaux Prestation</strong></td>
            <td>{{ formatCurrency(totalPayment) }}</td>
            <td></td>
          </tr>
          <tr class="summary-row">
            <td colspan="4"><strong>Extrêmes Prestation</strong></td>
            <td>
              {{ formatCurrency(minPayment) }} (min)<br>
              {{ formatCurrency(maxPayment) }} (max)
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import type { Teacher } from '@/types/teacher';

const props = defineProps<{
  teachers: Teacher[];
}>();

defineEmits<{
  (e: 'edit', teacher: Teacher): void;
  (e: 'delete', teacher: Teacher): void;
}>();

// Calcul uniquement pour la prestation
const totalPayment = computed(() =>
  props.teachers.reduce((sum, teacher) => sum + (teacher.nombreHeures * teacher.tauxHoraire), 0)
);

const minPayment = computed(() => {
  if (props.teachers.length === 0) return 0;
  return Math.min(...props.teachers.map(t => t.nombreHeures * t.tauxHoraire));
});

const maxPayment = computed(() => {
  if (props.teachers.length === 0) return 0;
  return Math.max(...props.teachers.map(t => t.nombreHeures * t.tauxHoraire));
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(value);
};
</script>

<style scoped>
/* [Conserver les mêmes styles que dans la version précédente] */
.teacher-list {
  margin-top: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
}

.table-responsive {
  overflow-x: auto;
  margin-top: 16px;
}

.teacher-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.teacher-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid #dee2e6;
}

.teacher-table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.teacher-table tfoot .summary-row {
  background-color: #f8f9fa;
  font-weight: 500;
}

.teacher-table tfoot td {
  border-top: 2px solid #dee2e6;
  padding: 10px 12px;
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
  font-size: 13px;
  transition: all 0.2s;
}

.btn-edit {
  background-color: #2196F3;
  color: white;
}

.btn-edit:hover {
  background-color: #0b7dda;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #da190b;
}

.no-data {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 20px;
}
</style>