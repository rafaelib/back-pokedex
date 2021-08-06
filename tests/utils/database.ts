import { getConnection, getManager } from "typeorm";
import { init } from "../../src/app";

export async function resetDatabase() {
  await getManager().query("TRUNCATE users, pokemons RESTART IDENTITY CASCADE");
}

export async function startConnection() {
  await init();
}
export async function endConnection() {
  await getConnection().close();
}
