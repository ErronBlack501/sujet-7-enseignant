import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    create(createTeacherDto: CreateTeacherDto): Promise<import("./entities/teacher.entity").Teacher>;
    findAll(): Promise<import("./entities/teacher.entity").Teacher[]>;
    findOne(id: string): Promise<import("./entities/teacher.entity").Teacher | null>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<{
        nom: string;
        tauxHoraire: number;
        nombreHeures: number;
        id: number;
        matricule: string;
        createdAt: Date;
        updatedAt: Date;
    } & import("./entities/teacher.entity").Teacher>;
    remove(id: string): Promise<import("./entities/teacher.entity").Teacher>;
}
