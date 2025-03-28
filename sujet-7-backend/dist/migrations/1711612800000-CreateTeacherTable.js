"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeacherTable1711612800000 = void 0;
class CreateTeacherTable1711612800000 {
    constructor() {
        this.name = 'CreateTeacherTable1711612800000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "teacher" (
        "id" SERIAL NOT NULL,
        "matricule" character varying(10) NOT NULL,
        "nom" character varying(50) NOT NULL,
        "tauxHoraire" decimal NOT NULL,
        "nombreHeures" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id")
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "teacher"`);
    }
}
exports.CreateTeacherTable1711612800000 = CreateTeacherTable1711612800000;
//# sourceMappingURL=1711612800000-CreateTeacherTable.js.map