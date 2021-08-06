import { getRepository } from "typeorm";
import Pokemon from "../../src/entities/Pokemon";
import Session from "../../src/entities/Session";
import User from "../../src/entities/User";
import supertest from "supertest";
import app from "../../src/app";
import { insertUser, createSession } from "../factories/userFactory";

export async function createPokemon(): Promise<Pokemon> {
  const pokemonRepository = getRepository(Pokemon);
  const pokemon = {
    id: 1,
    name: "bananamon",
    number: 10,
    image: "img",
    weight: 10,
    height: 10,
    baseExp: 40,
    description: "desc",
  };
  return await pokemonRepository.save(pokemon);
}

export async function addPokemon() {
  await insertUser();
  await createPokemon();
  await createSession(1);
  const dueUser = await getRepository(User).findOne();
  const dueSession = await getRepository(Session).findOne({
    where: { id: dueUser.id },
  });
  const result = await supertest(app)
    .post("/my-pokemons/1/add")
    .set("authorization", `Bearer ${dueSession.token}`);

  return result;
}
