import { MigrationInterface, QueryRunner } from "typeorm";

export class kimoveis1678070230683 implements MigrationInterface {
    name = 'kimoveis1678070230683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "admin" DROP NOT NULL`);
    }

}
