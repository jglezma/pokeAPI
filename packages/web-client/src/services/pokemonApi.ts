import type { IPokemon, IPokemonAdapted } from "@/models";
import { POKEMON_COLORS_BY_TYPE } from "@/utils";
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const LIMIT = 12;

export interface IPokemonResponse {
  name: string;
  url: string;
}

export interface IPokemonPaginated {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonAdapted[];
}

export interface IPokemonPaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemonResponse[];
}

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_POKEAPI_URL }),
  endpoints: (builder) => ({
    getPokemons: builder.query<IPokemonPaginated, number>({
      //@ts-ignore
      async queryFn(page, _queryApi, _extraOptions, fetchWithBQ) {
        // get pokemon list
        const responsePokemonList = await fetchWithBQ(
          `pokemon?offset=${LIMIT * page}&limit=${LIMIT}`
        );
        if (responsePokemonList.error)
          return { error: responsePokemonList.error as FetchBaseQueryError };
        const pokemons = responsePokemonList.data as IPokemonPaginatedResponse;
        const promises = [];
        for (let i = 0; i < LIMIT; i++) {
          const url = `https://pokeapi.co/api/v2/pokemon/${pokemons.results[i].name}`;
          promises.push(fetchWithBQ(url));
        }
        const data = await Promise.all(promises);
        const pokemonsDetails = data.map((pokemon) => {
          const currentPokemon = pokemon.data as IPokemon;
          return {
            ...currentPokemon,
            color: POKEMON_COLORS_BY_TYPE[currentPokemon.types[0].type.name],
          };
        }) as IPokemonAdapted[];
        const response = {
          results: pokemonsDetails,
          count: pokemons.count,
          next: pokemons.next,
          previous: pokemons.previous,
        };
        return {
          data: response,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonsQuery } = pokemonApi;
