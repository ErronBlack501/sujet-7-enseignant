"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialState1711612800000 = void 0;
class InitialState1711612800000 {
    async up(queryRunner) {
        await queryRunner.query(`
      -- This migration represents the initial state of the database
      -- The teacher table was created with the following structure:
      /*
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
      */
    `);
    }
    async down(queryRunner) {
        await queryRunner.query('-- Keeping existing table on rollback');
    }
}
exports.InitialState1711612800000 = InitialState1711612800000;
//# sourceMappingURL=1711612800000-InitialState.js.map