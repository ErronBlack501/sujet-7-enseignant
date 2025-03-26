import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 10 })
  matricule: string;

  @Column('varchar', { length: 50 })
  nom: string;

  @Column('decimal')
  tauxHoraire: number;

  @Column('int')
  nombreHeures: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  calculateSalary(): number {
    return this.tauxHoraire * this.nombreHeures;
  }
}
