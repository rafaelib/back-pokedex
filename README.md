# Pokédex API

An app that helps you catch'em all.

## About

This is an api where users can keep track of what Pokémon they have by adding or removing them from their pokédex. It also retrieves a bunch of data about every Pokémon.

Below are the implemented features:

- Sign Up
- Login
- List all pokémons and their information
- Flag a pokémon as yours
- Remove a pokémon from your pokédex

By using this app any user can easily get any pokémon's information, which helps when playing a Pokémon game.

## Technologies

The following tools and frameworks were used in the construction of the project:<br>

<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
    <img style='margin: 5px;' src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=whiteE'>
</p>

## How to run

1. Clone this repository: git clone https://github.com/rafaelib/back-pokedex.git
2. Create a Database named pokedex using postgreSQL
3. Create a .env file on the directory's root following the env.example pattern
4. Install dependencies

```bash
npm i
```

5. Build the project running

```bash
npm run build
```

6. Create the migrations

```bash
npm run typeorm migration:run
```

7. Run the back-end with

```bash
npm run dev
```

8. Finally, you can consume the API sending requests to http://localhost:4000/route replacing route with the desired route
