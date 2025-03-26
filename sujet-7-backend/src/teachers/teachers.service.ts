import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}

  // Créer un nouvel enseignant
  create(createTeacherDto: CreateTeacherDto) {
    const newTeacher = this.teachersRepository.create(createTeacherDto);
    return this.teachersRepository.save(newTeacher);
  }

  // Récupérer tous les enseignants
  findAll() {
    return this.teachersRepository.find();
  }

  // Récupérer un enseignant par son ID
  findOne(id: number) {
    return this.teachersRepository.findOneBy({ id });
  }

  // Mettre à jour un enseignant
  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.findOne(id);

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }

    return this.teachersRepository.save({ ...teacher, ...updateTeacherDto });
  }

  // Supprimer un enseignant
  async remove(id: number) {
    const teacher = await this.findOne(id);
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return this.teachersRepository.remove(teacher);
  }
}
