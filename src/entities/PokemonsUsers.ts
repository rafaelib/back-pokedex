import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Pokemon from "./Pokemon";
import User from "./User";

@Entity("pokemons_users")
export default class PokemonsUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  pokemonId: number;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.PokemonsUsers)
  pokemon: Pokemon;

  @ManyToOne(() => User, (user) => user.PokemonsUsers)
  user: User;
}
