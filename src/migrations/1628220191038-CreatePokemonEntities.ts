import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePokemonEntities1628220191038 implements MigrationInterface {
    name = 'CreatePokemonEntities1628220191038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemons_users" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_a289ccfe23001151f4e2a25da14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" ADD CONSTRAINT "FK_ed3d45c1529b75ca03bd4c3aef2" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" ADD CONSTRAINT "FK_05586f00425c78322bf644eb52a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons_users" DROP CONSTRAINT "FK_05586f00425c78322bf644eb52a"`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" DROP CONSTRAINT "FK_ed3d45c1529b75ca03bd4c3aef2"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
        await queryRunner.query(`DROP TABLE "pokemons_users"`);
    }

}
