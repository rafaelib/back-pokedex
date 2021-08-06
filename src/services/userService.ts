import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

import User from "../entities/User";
import Session from "../entities/Session";

interface NewUser {
  email: string;
  password: string;
}

export async function makeUser(user: NewUser): Promise<boolean> {
  const existentUser = await getRepository(User).findOne({
    where: { email: user.email },
  });
  if (existentUser) return false;
  await getRepository(User).insert(user);
  return true;
}

export async function signIn(user: NewUser): Promise<string> {
  const existentUser = await getRepository(User).findOne({
    where: { email: user.email },
  });

  if (!existentUser) return null;

  console.log(user);

  if (bcrypt.compareSync(user.password, existentUser.password)) {
    const token = uuid();
    await getRepository(Session).insert({ userId: existentUser.id, token });
    return token;
  } else {
    return null;
  }
}
