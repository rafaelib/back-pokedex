import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import PokemonsUsers from "./PokemonsUsers";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => PokemonsUsers, (PokemonsUsers) => PokemonsUsers.user)
  PokemonsUsers: PokemonsUsers[];
}
