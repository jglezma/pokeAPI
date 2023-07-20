import PokemonModel from "../models/PokemonModel";
import servers from "../../app";

const { io } = servers;

io.on("connection", (socket) => {
  socket.on("get-pokemons-by-username", async (username: string) => {
    try {
      const pokemons = await PokemonModel.find({ username });
      const pokemonsDict: Record<number, boolean> = {};
      pokemons.forEach((pokemon) => {
        pokemonsDict[pokemon.pokemonId] = true;
      });
      socket.emit(`set-captured-pokemons-${username}`, pokemonsDict);
    } catch (e) {
      console.log("Error on get pokemons by username");
    }
  });
});
