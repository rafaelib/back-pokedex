import { Request, Response } from "express";
import bcrypt from "bcrypt";
import newUserSchema from "../schemas/newUserSchema";
import userSchema from "../schemas/userSchema";

import * as userService from "../services/userService";

export async function makeUser(req: Request, res: Response) {
  const { email, password } = req.body;
  if (newUserSchema.validate(req.body).error) return res.sendStatus(400);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await userService.makeUser({
    email,
    password: hashedPassword,
  });
  if (!newUser) return res.sendStatus(409);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  if (userSchema.validate(req.body).error) return res.sendStatus(400);

  const result = await userService.signIn({
    email,
    password,
  });

  if (result === null) return res.sendStatus(401);
  console.log(typeof result);

  res.send(result);
}
