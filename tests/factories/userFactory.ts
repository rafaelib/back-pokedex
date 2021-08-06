import { getRepository } from "typeorm";
import faker from "faker";
import supertest from "supertest";
import app from "../../src/app";

import User from "../../src/entities/User";
import Session from "../../src/entities/Session";

const agent = supertest(app);

export async function createUser() {
  const correctPassword = faker.internet.password();
  const body = {
    email: faker.internet.email(),
    password: correctPassword,
    confirmPassword: correctPassword,
  };
  return body;
}

export async function insertUser() {
  const password = faker.internet.password();
  const newUser = getRepository(User).create({
    email: faker.internet.email(),
    password: password,
  });
  await getRepository(User).insert(newUser);
  return {
    email: newUser.email,
    password,
  };
}

export async function insertFormatedUser() {
  const newUser = await createUser();
  await agent.post("/sign-up").send(newUser);
  newUser.confirmPassword = undefined;
  const result = await agent.post("/sign-in").send(newUser);
  return result;
}

export async function createSession(userId: number) {
  const body = {
    userId,
    token: "tokenvalido",
  };

  await getRepository(Session).save({
    userId: userId,
    token: body.token,
  });

  return body;
}

export async function findByEmail(email: string) {
  const user = await getRepository(User).findOne({ where: { email } });
  return user;
}
