import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
export declare class TeachersService {
    private readonly teachersRepository;
    constructor(teachersRepository: Repository<Teacher>);
    create(createTeacherDto: CreateTeacherDto): Promise<Teacher>;
    findAll(): Promise<Teacher[]>;
    findOne(id: number): Promise<Teacher | null>;
    update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<{
        nom: string;
        tauxHoraire: number;
        nombreHeures: number;
        id: number;
        matricule: string;
        createdAt: Date;
        updatedAt: Date;
    } & Teacher>;
    remove(id: number): Promise<Teacher>;
}
