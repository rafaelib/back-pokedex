import { Request, Response } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getAllPokemon(req: Request, res: Response) {
  const { userId } = res.locals;
  const allPokemon = await pokemonService.getAllPokemon(userId);
  res.send(allPokemon);
}

export async function flagNewPokemon(req: Request, res: Response) {
  const { userId } = res.locals;
  const pokemonId = req.params.id;
  if (!pokemonId || isNaN(Number(pokemonId))) {
    return res.sendStatus(400);
  }
  const result = await pokemonService.flagNewPokemon(userId, Number(pokemonId));
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
}

export async function unflagNewPokemon(req: Request, res: Response) {
  const { userId } = res.locals;
  const pokemonId = req.params.id;
  if (!pokemonId || isNaN(Number(pokemonId))) {
    return res.sendStatus(400);
  }
  const result = await pokemonService.unflagNewPokemon(
    userId,
    Number(pokemonId)
  );
  if (!result) return res.sendStatus(400);
  return res.sendStatus(200);
}
