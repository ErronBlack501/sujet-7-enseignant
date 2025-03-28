<template>
  <div class="modal">
    <div class="modal-content">
      <h4>Confirmer la suppression</h4>
      <p>Êtes-vous sûr de vouloir supprimer l'enseignant {{ teacher?.nom }} ({{ teacher?.matricule }}) ?</p>
      <div class="modal-actions">
        <button @click="$emit('confirm')" class="btn btn-confirm" :disabled="isDeleting">
          <span v-if="isDeleting">Suppression...</span>
          <span v-else>Confirmer</span>
        </button>
        <button @click="$emit('cancel')" class="btn btn-cancel">Annuler</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Teacher } from '@/types/teacher';

defineProps<{
  teacher: Teacher | null;
  isDeleting: boolean;
}>();

defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
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

.btn-confirm {
  background-color: #f44336;
  color: white;
}

.btn-cancel {
  background-color: #f0f0f0;
  color: #333;
}
</style>
