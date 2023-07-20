import { Schema, model } from "mongoose";

export interface IPokemon {
  username: string;
  pokemonId: number;
}

const PokemonSchema = new Schema<IPokemon>(
  {
    username: { type: String, required: true },
    pokemonId: { type: Number, requried: true },
  },
  {
    timestamps: true,
  }
);

// Avoid the same pokemon captured by the same username
PokemonSchema.index({ username: 1, pokemonId: 1 }, { unique: true });

export default model<IPokemon>("Pokemon", PokemonSchema);
