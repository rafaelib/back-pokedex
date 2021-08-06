import "./setup";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "reflect-metadata";
import authMiddleware from "./middlewares/authMiddleware";

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as pokemonController from "./controllers/pokemonController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.makeUser);
app.post("/sign-in", userController.signIn);
app.get("/pokemons", authMiddleware, pokemonController.getAllPokemon);
app.post(
  "/my-pokemons/:id/add",
  authMiddleware,
  pokemonController.flagNewPokemon
);
app.post(
  "/my-pokemons/:id/remove",
  authMiddleware,
  pokemonController.unflagNewPokemon
);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  return res.sendStatus(500);
});

export async function init() {
  await connectDatabase();
}

export default app;
