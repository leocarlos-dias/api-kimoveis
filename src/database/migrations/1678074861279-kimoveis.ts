import { MigrationInterface, QueryRunner } from "typeorm";

export class kimoveis1678074861279 implements MigrationInterface {
    name = 'kimoveis1678074861279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "street" varchar(45) NOT NULL, "zipCode" varchar(8) NOT NULL, "number" varchar(6) NOT NULL, "city" varchar(20) NOT NULL, "state" varchar(2) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(45) NOT NULL, "email" varchar(45) NOT NULL, "admin" boolean NOT NULL DEFAULT (0), "password" varchar(120) NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "deletedAt" text, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" text NOT NULL, "hour" text NOT NULL, "usersId" integer, "realEstateId" integer)`);
        await queryRunner.query(`CREATE TABLE "real_state" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (0), "value" decimal(10,2) NOT NULL, "size" integer NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "addressId" integer, "categoryId" integer, CONSTRAINT "REL_05088449764d42ca807c1b09fc" UNIQUE ("addressId"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(45) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "temporary_schedules" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" text NOT NULL, "hour" text NOT NULL, "usersId" integer, "realEstateId" integer, CONSTRAINT "FK_e61e0268dc44647ddc3d674dfe8" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_ac3131bb922483053abebc5e9ff" FOREIGN KEY ("realEstateId") REFERENCES "real_state" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_schedules"("id", "date", "hour", "usersId", "realEstateId") SELECT "id", "date", "hour", "usersId", "realEstateId" FROM "schedules"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`ALTER TABLE "temporary_schedules" RENAME TO "schedules"`);
        await queryRunner.query(`CREATE TABLE "temporary_real_state" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (0), "value" decimal(10,2) NOT NULL, "size" integer NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "addressId" integer, "categoryId" integer, CONSTRAINT "REL_05088449764d42ca807c1b09fc" UNIQUE ("addressId"), CONSTRAINT "FK_05088449764d42ca807c1b09fc1" FOREIGN KEY ("addressId") REFERENCES "addresses" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_a9490420a41bd06f69da8d4e946" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_real_state"("id", "sold", "value", "size", "createdAt", "updatedAt", "addressId", "categoryId") SELECT "id", "sold", "value", "size", "createdAt", "updatedAt", "addressId", "categoryId" FROM "real_state"`);
        await queryRunner.query(`DROP TABLE "real_state"`);
        await queryRunner.query(`ALTER TABLE "temporary_real_state" RENAME TO "real_state"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_state" RENAME TO "temporary_real_state"`);
        await queryRunner.query(`CREATE TABLE "real_state" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (0), "value" decimal(10,2) NOT NULL, "size" integer NOT NULL, "createdAt" text NOT NULL DEFAULT (datetime('now')), "updatedAt" text NOT NULL DEFAULT (datetime('now')), "addressId" integer, "categoryId" integer, CONSTRAINT "REL_05088449764d42ca807c1b09fc" UNIQUE ("addressId"))`);
        await queryRunner.query(`INSERT INTO "real_state"("id", "sold", "value", "size", "createdAt", "updatedAt", "addressId", "categoryId") SELECT "id", "sold", "value", "size", "createdAt", "updatedAt", "addressId", "categoryId" FROM "temporary_real_state"`);
        await queryRunner.query(`DROP TABLE "temporary_real_state"`);
        await queryRunner.query(`ALTER TABLE "schedules" RENAME TO "temporary_schedules"`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" text NOT NULL, "hour" text NOT NULL, "usersId" integer, "realEstateId" integer)`);
        await queryRunner.query(`INSERT INTO "schedules"("id", "date", "hour", "usersId", "realEstateId") SELECT "id", "date", "hour", "usersId", "realEstateId" FROM "temporary_schedules"`);
        await queryRunner.query(`DROP TABLE "temporary_schedules"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "real_state"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
