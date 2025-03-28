import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialState1711612800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Table already exists, so this is just for tracking
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

  public async down(queryRunner: QueryRunner): Promise<void> {
    // We don't want to drop the table on rollback since it existed before migrations
    await queryRunner.query('-- Keeping existing table on rollback');
  }
}
