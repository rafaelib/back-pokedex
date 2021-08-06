import Pokemon from "../entities/Pokemon";
import PokemonsUsers from "../entities/PokemonsUsers";
import { getRepository } from "typeorm";

export async function getAllPokemon(userId: number): Promise<object> {
  const pokemons = await getRepository(Pokemon).find();
  const flaggedPokemons = pokemons.map((pokemon) => ({
    ...pokemon,
    inMyPokemons: false,
  }));
  const myPokemons = await getRepository(PokemonsUsers).find({
    where: { userId },
  });
  const myPokemonsIds = myPokemons.map((pokemon) => pokemon.pokemonId);

  for (let i = 0; i < flaggedPokemons.length; i++) {
    flaggedPokemons[i].inMyPokemons = myPokemonsIds.includes(
      flaggedPokemons[i].id
    );
  }

  return flaggedPokemons;
}

export async function flagNewPokemon(
  userId: number,
  pokemonId: number
): Promise<boolean> {
  const myPokemons = await getRepository(PokemonsUsers).find({
    where: { userId },
  });
  const myPokemonIds = myPokemons.map((pokemon) => pokemon.pokemonId);
  if (myPokemonIds.includes(pokemonId)) {
    return false;
  } else {
    await getRepository(PokemonsUsers).save({ userId, pokemonId });
    return true;
  }
}
