import type { IPokemon } from "@/models";

export const POKEMON_COLORS_BY_TYPE: Record<string, string> = {
  rock: "#B69E31",
  normal: "#AAA67F",
  ghost: "#70559B",
  fighting: "#C12239",
  steel: "#B7B9D0",
  flying: "#A891EC",
  poison: "#A43E9E",
  water: "#6493EB",
  grass: "#74CB48",
  ground: "#DEC16B",
  psychic: "#FB5584",
  bug: "#A7B723",
  ice: "#9AD6DF",
  fire: "#F57D31",
  dark: "#75574C",
  electric: "#F9CF30",
  fairy: "#E69EAC",
  dragon: "#7037FF",
};

export const POKEMON_STATS_CODE: Record<string, string> = {
  hp: "hp",
  attack: "atk",
  defense: "def",
  "special-attack": "satk",
  "special-defense": "sdef",
  speed: "spd",
};

// Get pokemon image by default or return an image by default
export const getPokemonImage = (pokemon: IPokemon) => {
  return (
    pokemon.sprites.other["official-artwork"].front_default ??
    pokemon.sprites.other.dream_world.front_default ??
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
  );
};

// Get color by type
export const getPokemonColor = (type: string) => {
  return POKEMON_COLORS_BY_TYPE[type];
};
