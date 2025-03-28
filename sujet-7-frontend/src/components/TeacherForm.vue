<template>
  <div class="teacher-form">
    <div class="form-header">
      <h4>{{ isEditing ? 'Modifier un enseignant' : 'Ajouter un nouvel enseignant' }}</h4>
      <button @click="$emit('close')" class="btn btn-close">
        <i class="bi bi-x"></i>
      </button>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="matricule">Matricule</label>
        <input 
          type="text" 
          id="matricule" 
          v-model="formData.matricule" 
          placeholder="Entrez le matricule" 
          :readonly="isEditing"
          required
        >
      </div>
      <div class="form-group">
        <label for="nom">Nom complet</label>
        <input 
          type="text" 
          id="nom" 
          v-model="formData.nom" 
          placeholder="Entrez le nom complet" 
          required
        >
      </div>
      <div class="form-group">
        <label for="tauxHoraire">Taux horaire</label>
        <input 
          type="number" 
          id="tauxHoraire" 
          v-model.number="formData.tauxHoraire" 
          placeholder="Entrez le taux horaire" 
          min="0"
          step="0.01"
          required
        >
      </div>
      <div class="form-group">
        <label for="nombreHeures">Nombre d'heures</label>
        <input 
          type="number" 
          id="nombreHeures" 
          v-model.number="formData.nombreHeures" 
          placeholder="Entrez le nombre d'heures" 
          min="0"
          required
        >
      </div>
      <div class="form-actions">
        <button type="submit" class="btn btn-save" :disabled="props.isSaving">
          <span v-if="props.isSaving">{{ isEditing ? 'Mise à jour...' : 'Enregistrement...' }}</span>
          <span v-else>{{ isEditing ? 'Mettre à jour' : 'Enregistrer' }}</span>
        </button>
        <button type="button" @click="resetForm" class="btn btn-reset">
          Réinitialiser
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Teacher, TeacherFormData } from '@/types/teacher';

const props = defineProps<{
  teacher?: Teacher;
  isEditing: boolean;
  isSaving: boolean;
}>();

const emit = defineEmits<{
  (e: 'submit', data: TeacherFormData): void;
  (e: 'close'): void;
}>();

const formData = ref<TeacherFormData>({
  matricule: '',
  nom: '',
  tauxHoraire: null,
  nombreHeures: null
});

watch(() => props.teacher, (newTeacher) => {
  if (newTeacher) {
    formData.value = { ...newTeacher };
  }
}, { immediate: true });

const handleSubmit = () => {
  emit('submit', { ...formData.value });
};

const resetForm = () => {
  if (props.teacher && props.isEditing) {
    formData.value = { ...props.teacher };
  } else {
    formData.value = {
      matricule: '',
      nom: '',
      tauxHoraire: null,
      nombreHeures: null
    };
  }
};
</script>

<style scoped>
.teacher-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-save {
  background-color: #4CAF50;
  color: white;
}

.btn-reset {
  background-color: #f0f0f0;
  color: #333;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
}
</style>
