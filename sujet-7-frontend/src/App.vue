<template>
  <div class="container">
    <div class="header">
      <h2>Gestion des enseignants</h2>
      <button @click="showForm" class="btn btn-primary">
        <i class="bi bi-plus-circle"></i> Ajouter un enseignant
      </button>
    </div>

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
                <button class="btn btn-edit" @click="editTeacher(teacher)">
                  <i class="bi bi-pencil-square"></i> Modifier
                </button>
                <button class="btn btn-delete" @click="confirmDelete(teacher)">
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

    <div v-if="isFormVisible" class="teacher-form">
      <div class="form-header">
        <h4>{{ isEditing ? 'Modifier un enseignant' : 'Ajouter un nouvel enseignant' }}</h4>
        <button @click="closeForm" class="btn btn-close">
          <i class="bi bi-x"></i>
        </button>
      </div>
      <form @submit.prevent="saveTeacher">
        <div class="form-group">
          <label for="matricule">Matricule</label>
          <input 
            type="text" 
            id="matricule" 
            v-model="newTeacher.matricule" 
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
            v-model="newTeacher.nom" 
            placeholder="Entrez le nom complet" 
            required
          >
        </div>
        <div class="form-group">
          <label for="tauxHoraire">Taux horaire</label>
          <input 
            type="number" 
            id="tauxHoraire" 
            v-model.number="newTeacher.tauxHoraire" 
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
            v-model.number="newTeacher.nombreHeures" 
            placeholder="Entrez le nombre d'heures" 
            min="0"
            required
          >
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-save">
            {{ isEditing ? 'Mettre à jour' : 'Enregistrer' }}
          </button>
          <button type="button" @click="resetForm" class="btn btn-reset">
            Réinitialiser
          </button>
        </div>
      </form>
    </div>

    <div v-if="message" class="alert" :class="{'alert-success': !errorMessage, 'alert-error': errorMessage}">
      {{ message }}
      <button @click="message = ''" class="alert-close">
        <i class="bi bi-x"></i>
      </button>
    </div>

    <div v-if="showDeleteModal" class="modal">
      <div class="modal-content">
        <h4>Confirmer la suppression</h4>
        <p>Êtes-vous sûr de vouloir supprimer l'enseignant {{ teacherToDelete?.nom }} ({{ teacherToDelete?.matricule }}) ?</p>
        <div class="modal-actions">
          <button @click="deleteTeacher" class="btn btn-confirm">Confirmer</button>
          <button @click="cancelDelete" class="btn btn-cancel">Annuler</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from './api.js';

export default {
  data() {
    return {
      teachers: [],
      isFormVisible: false,
      newTeacher: { 
        matricule: '', 
        nom: '', 
        tauxHoraire: null, 
        nombreHeures: null 
      },
      message: '',
      errorMessage: false,
      isEditing: false,
      teacherToEdit: null,
      showDeleteModal: false,
      teacherToDelete: null
    };
  },
  created() {
    this.fetchTeachers();
  },
  methods: {
    async fetchTeachers() {
      try {
        const response = await api.get('/teachers');
        this.teachers = response.data;
        this.message = '';
      } catch (error) {
        console.error('Error fetching teachers:', error);
        this.showMessage('Erreur lors du chargement des enseignants', true);
      }
    },
    showForm() {
      this.isFormVisible = true;
      this.isEditing = false;
      this.resetForm();
    },
    closeForm() {
      this.isFormVisible = false;
      this.resetForm();
    },
    editTeacher(teacher) {
      this.isFormVisible = true;
      this.isEditing = true;
      this.teacherToEdit = teacher;
      this.newTeacher = { ...teacher };
    },
    async saveTeacher() {
      try {
        if (this.isEditing) {
          const { matricule, ...teacherData } = this.newTeacher;
          const response = await api.patch(`/teachers/${this.teacherToEdit.id}`, teacherData);
          
          const index = this.teachers.findIndex(t => t.id === this.teacherToEdit.id);
          if (index !== -1) {
            this.teachers.splice(index, 1, response.data);
          }
          this.showMessage('Enseignant modifié avec succès');
        } else {
          const response = await api.post('/teachers', this.newTeacher);
          this.teachers.push(response.data);
          this.showMessage('Enseignant ajouté avec succès');
        }

        this.closeForm();
      } catch (error) {
        console.error('Error saving teacher:', error);
        const errorMsg = error.response?.data?.message || error.message;
        this.showMessage(`Erreur: ${errorMsg}`, true);
      }
    },
    confirmDelete(teacher) {
      this.teacherToDelete = teacher;
      this.showDeleteModal = true;
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.teacherToDelete = null;
    },
    async deleteTeacher() {
      try {
        await api.delete(`/teachers/${this.teacherToDelete.id}`);
        this.teachers = this.teachers.filter(t => t.id !== this.teacherToDelete.id);
        this.showDeleteModal = false;
        this.showMessage('Enseignant supprimé avec succès');
      } catch (error) {
        console.error('Error deleting teacher:', error);
        this.showMessage("Erreur lors de la suppression de l'enseignant", true);
      }
    },
    resetForm() {
      this.newTeacher = { matricule: '', nom: '', tauxHoraire: null, nombreHeures: null };
      this.teacherToEdit = null;
      this.isEditing = false;
    },
    showMessage(msg, isError = false) {
      this.message = msg;
      this.errorMessage = isError;
      setTimeout(() => {
        this.message = '';
      }, 5000);
    },
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.teacher-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.teacher-table th, 
.teacher-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.teacher-table th {
  background-color: #f5f7fa;
  font-weight: 600;
  color: #333;
}

.teacher-table tr:hover {
  background-color: #f9f9f9;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4a6bdf;
  color: white;
}

.btn-primary:hover {
  background-color: #3a56c0;
}

.btn-edit {
  background-color: #ffc107;
  color: #212529;
}

.btn-edit:hover {
  background-color: #e0a800;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
  margin-left: 8px;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-save {
  background-color: #28a745;
  color: white;
}

.btn-save:hover {
  background-color: #218838;
}

.btn-reset {
  background-color: #6c757d;
  color: white;
  margin-left: 10px;
}

.btn-reset:hover {
  background-color: #5a6268;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6c757d;
}

.teacher-form {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-top: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.alert {
  padding: 15px;
  border-radius: 4px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-error {
  background-color: #f8d7da;
  color: #721c24;
}

.alert-close {
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
}

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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-confirm {
  background-color: #dc3545;
  color: white;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}

.actions {
  white-space: nowrap;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .teacher-table {
    display: block;
    overflow-x: auto;
  }
  
  .form-actions {
    justify-content: center;
  }
}

form input{
  width: 10em;
}
</style>