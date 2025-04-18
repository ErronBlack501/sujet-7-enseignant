<template>
  <div class="container">
    <div class="header">
      <h2>Gestion des enseignants</h2>
      <button @click="showForm" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Ajouter un enseignant
      </button>
    </div>

    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Chargement des enseignants...</p>
    </div>

    <TeacherList
      v-else
      :teachers="teachers"
      @edit="editTeacher"
      @delete="confirmDelete"
    />

    <ChartPayment
      :teachers="teachers"
    />

    <div v-if="isFormVisible" class="modal-overlay">
        <TeacherForm
          :teacher="teacherToEdit"
          :is-editing="isEditing"
          :is-saving="isSaving"
          @submit="saveTeacher"
          @close="closeForm"
        />
    </div>

    <DeleteConfirmationModal
      v-if="showDeleteModal"
      :teacher="teacherToDelete"
      :is-deleting="isDeleting"
      @confirm="deleteTeacher"
      @cancel="cancelDelete"
    />

    <Alert
      v-if="message"
      :message="message"
      :is-error="errorMessage"
      @close="message = ''"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TeacherList from '@/components/TeacherList.vue';
import TeacherForm from '@/components/TeacherForm.vue';
import ChartPayment from '@/components/ChartPayment.vue';
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue';
import Alert from '@/components/Alert.vue';
import { teacherService } from '@/services/teacherService';
import type { Teacher, TeacherFormData } from '@/types/teacher';


const teachers = ref<Teacher[]>([]);
const isFormVisible = ref(false);
const isEditing = ref(false);
const teacherToEdit = ref<Teacher | undefined>(undefined);
const showDeleteModal = ref(false);
const teacherToDelete = ref<Teacher | null>(null);
const message = ref('');
const errorMessage = ref(false);
const isLoading = ref(false);
const isSaving = ref(false);
const isDeleting = ref(false);

onMounted(async () => {
  await fetchTeachers();
});

const fetchTeachers = async () => {
  try {
    isLoading.value = true;
    teachers.value = await teacherService.getAll();
    message.value = '';
  } catch (error) {
    console.error('Error fetching teachers:', error);
    const errorMsg = error instanceof Error ? error.message : 'Erreur lors du chargement des enseignants';
    showMessage(errorMsg, true);
  } finally {
    isLoading.value = false;
  }
};

const showForm = () => {
  isFormVisible.value = true;
  isEditing.value = false;
  teacherToEdit.value = undefined;
};

const closeForm = () => {
  isFormVisible.value = false;
  teacherToEdit.value = undefined;
};

const editTeacher = (teacher: Teacher) => {
  isFormVisible.value = true;
  isEditing.value = true;
  teacherToEdit.value = teacher;
};

const saveTeacher = async (formData: TeacherFormData) => {
  try {
    isSaving.value = true;
    const processedData = {
      ...formData,
      tauxHoraire: formData.tauxHoraire ?? undefined,
      nombreHeures: formData.nombreHeures ?? undefined
    };

    if (isEditing.value && teacherToEdit.value?.id) {
      const { matricule, ...teacherData } = processedData;
      const updatedTeacher = await teacherService.update(teacherToEdit.value.id, teacherData);
      const index = teachers.value.findIndex(t => t.id === teacherToEdit.value?.id);
      if (index !== -1) {
        teachers.value[index] = updatedTeacher;
        teachers.value = [...teachers.value]; // Force Vue reactivity for chart update
      }
      showMessage('Enseignant modifié avec succès');
    } else {
      const newTeacher = await teacherService.create(processedData as Teacher);
      teachers.value = [...teachers.value, newTeacher]; // Force Vue reactivity for chart update
      showMessage('Enseignant ajouté avec succès');
    }
    closeForm();
  } catch (error) {
    console.error('Error saving teacher:', error);
    let errorMsg = 'Une erreur est survenue';
    if (error instanceof Error) {
      errorMsg = error.message;
    } else if (typeof error === 'object' && error !== null && 'response' in error &&
               error.response && typeof error.response === 'object' && 'data' in error.response &&
               error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      errorMsg = (error.response.data as { message: string }).message;
    }
    showMessage(errorMsg, true);
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = (teacher: Teacher) => {
  teacherToDelete.value = teacher;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  teacherToDelete.value = null;
  showDeleteModal.value = false;
};

const deleteTeacher = async () => {
  if (!teacherToDelete.value?.id) return;

  try {
    isDeleting.value = true;
    await teacherService.delete(teacherToDelete.value.id);
    teachers.value = teachers.value.filter(t => t.id !== teacherToDelete.value?.id);
    showMessage('Enseignant supprimé avec succès');
    cancelDelete();
  } catch (error) {
    console.error('Error deleting teacher:', error);
    let errorMsg = 'Erreur lors de la suppression de l\'enseignant';
    if (error instanceof Error) {
      errorMsg = error.message;
    } else if (typeof error === 'object' && error !== null && 'response' in error &&
               error.response && typeof error.response === 'object' && 'data' in error.response &&
               error.response.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      errorMsg = (error.response.data as { message: string }).message;
    }
    showMessage(errorMsg, true);
  } finally {
    isDeleting.value = false;
  }
};

const showMessage = (msg: string, isError = false) => {
  message.value = msg;
  errorMessage.value = isError;
  setTimeout(() => {
    message.value = '';
  }, 5000);
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-primary {
  background-color: #2196F3;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.btn-primary i {
  font-size: 1.2rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #2196F3;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
