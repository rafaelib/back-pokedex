import supertest from "supertest";

import app, { init } from "../../src/app";
import {
  createUser,
  insertUser,
  insertFormatedUser,
} from "../factories/userFactory";
import { resetDatabase, endConnection } from "../utils/database";

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

describe("POST /sign-up", () => {
  it("should return 201 for valid params", async () => {
    const newUser = await createUser();
    const result = await agent.post("/sign-up").send(newUser);
    expect(result.status).toEqual(201);
  });
  it("should return 400 for invalid email", async () => {
    const newUser = await createUser();
    newUser.email = "banana";
    const result = await agent.post("/sign-up").send(newUser);
    expect(result.status).toEqual(400);
  });
  it("should return 400 for not matching passwords", async () => {
    const newUser = await createUser();
    newUser.confirmPassword = "banana";
    const result = await agent.post("/sign-up").send(newUser);
    expect(result.status).toEqual(400);
  });
  it("should return 409 for already registered email", async () => {
    const existentUser = await insertUser();
    const newUser = { ...existentUser, confirmPassword: existentUser.password };
    const result = await agent.post("/sign-up").send(newUser);
    expect(result.status).toEqual(409);
  });
});

describe("POST /sign-in", () => {
  it("should return 200 for valid params", async () => {
    const result = await insertFormatedUser();
    expect(result.status).toEqual(200);
  });

  it("should return a token for valid params", async () => {
    const result = await insertFormatedUser();
    expect(result.text.length).toEqual(36);
  });

  it("should return 400 for invalid password", async () => {
    const newUser = await insertUser();
    newUser.password = "aa";
    const result = await agent.post("/sign-in").send(newUser);
    expect(result.status).toEqual(400);
  });

  it("should return 400 for invalid email", async () => {
    const newUser = await insertUser();
    newUser.email = "aa";
    const result = await agent.post("/sign-in").send(newUser);
    expect(result.status).toEqual(400);
  });

  it("should return 401 for no matching email", async () => {
    const newUser = await insertUser();
    newUser.email = "bananasdepijamas@gmail.com";
    const result = await agent.post("/sign-in").send(newUser);
    expect(result.status).toEqual(401);
  });
});
