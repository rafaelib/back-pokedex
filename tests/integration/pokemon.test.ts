import supertest from "supertest";
import { getRepository } from "typeorm";
import Session from "../../src/entities/Session";
import User from "../../src/entities/User";
import Pokemon from "../../src/entities/Pokemon";

import app, { init } from "../../src/app";
import {
  createUser,
  insertUser,
  insertFormatedUser,
  createSession,
  findByEmail,
} from "../factories/userFactory";
import { resetDatabase, endConnection } from "../utils/database";
import { createPokemon, addPokemon } from "../factories/pokemonFactory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await endConnection();
});

const agent = supertest(app);

describe("GET /pokemons", () => {
  it("should return 401 for no token", async () => {
    const result = await agent.get("/pokemons");
    expect(result.status).toEqual(401);
  });

  it("should return 200 for valid auth", async () => {
    await insertUser();
    const newSession = await createSession(1);
    const result = await agent
      .get("/pokemons")
      .set("Authorization", `Bearer ${newSession.token}`);
    expect(result.status).toEqual(200);
  });
});

describe("POST /my-pokemons/:id/add", () => {
  it("should return 401 for no token", async () => {
    await createPokemon();
    const result = await supertest(app).post("/my-pokemons/1/add");
    expect(result.status).toEqual(401);
  });

  it("should return 200 for valid params", async () => {
    const result = await addPokemon();

    expect(result.status).toEqual(200);
  });
});

describe("POST /my-pokemons/:id/remove", () => {
  it("should return 401 for no token", async () => {
    await addPokemon();
    const result = await supertest(app).post("/my-pokemons/1/remove");
    expect(result.status).toEqual(401);
  });

  it("should return 200 for valid params", async () => {
    await addPokemon();
    const result = await supertest(app)
      .post("/my-pokemons/1/remove")
      .set("authorization", "Bearer tokenvalido");
    expect(result.status).toEqual(200);
  });
});
