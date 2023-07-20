import { type IPokemonPaginated, pokemonApi } from "@/services";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: IPokemonPaginated = {
  count: 0,
  next: null,
  previous: null,
  results: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      pokemonApi.endpoints.getPokemons.matchFulfilled,
      (state, { payload }) => {
        state.count = payload.count;
        state.next = payload.next;
        state.previous = payload.previous;
        state.results = [...state.results, ...payload.results];
      }
    );
  },
});

// Actions
// export const {} = pokemonSlice.actions;

// Selectors
export const selectPokemons = (state: RootState) => state.pokemon.results;
export const selectNextPokemonsPage = (state: RootState) => state.pokemon.next;

// Reducer
export default pokemonSlice.reducer;
