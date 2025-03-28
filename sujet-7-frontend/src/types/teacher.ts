export interface Teacher {
  id?: number;
  matricule: string;
  nom: string;
  tauxHoraire: number;
  nombreHeures: number;
  createdAt?: Date;
  updatedAt?: Date;
  
  // Calculated field
  salary?: number;
}

export interface TeacherFormData {
  matricule: string;
  nom: string;
  tauxHoraire: number | null;
  nombreHeures: number | null;
}
