"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const teacher_entity_1 = require("./entities/teacher.entity");
const typeorm_2 = require("typeorm");
let TeachersService = class TeachersService {
    constructor(teachersRepository) {
        this.teachersRepository = teachersRepository;
    }
    create(createTeacherDto) {
        const newTeacher = this.teachersRepository.create(createTeacherDto);
        return this.teachersRepository.save(newTeacher);
    }
    findAll() {
        return this.teachersRepository.find();
    }
    findOne(id) {
        return this.teachersRepository.findOneBy({ id });
    }
    async update(id, updateTeacherDto) {
        const teacher = await this.findOne(id);
        if (!teacher) {
            throw new common_1.NotFoundException(`Teacher with ID ${id} not found`);
        }
        return this.teachersRepository.save({ ...teacher, ...updateTeacherDto });
    }
    async remove(id) {
        const teacher = await this.findOne(id);
        if (!teacher) {
            throw new common_1.NotFoundException(`Teacher with ID ${id} not found`);
        }
        return this.teachersRepository.remove(teacher);
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map