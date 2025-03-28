export declare class Teacher {
    id: number;
    matricule: string;
    nom: string;
    tauxHoraire: number;
    nombreHeures: number;
    createdAt: Date;
    updatedAt: Date;
    calculateSalary(): number;
}
