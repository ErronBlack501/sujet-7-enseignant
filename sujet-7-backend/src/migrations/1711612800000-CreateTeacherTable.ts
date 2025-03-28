import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeacherTable1711612800000 implements MigrationInterface {
  name = 'CreateTeacherTable1711612800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "teacher"`);
  }
}
