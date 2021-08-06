import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import PokemonsUsers from "./PokemonsUsers";
@Entity("pokemons")
export default class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number: number;

  @Column()
  image: string;

  @Column()
  weight: number;

  @Column()
  height: number;

  @Column()
  baseExp: number;

  @Column()
  description: string;

  @OneToMany(() => PokemonsUsers, (PokemonsUsers) => PokemonsUsers.pokemon)
  PokemonsUsers: PokemonsUsers[];
}
