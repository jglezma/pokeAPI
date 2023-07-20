export interface IPokemonAdapted extends IPokemon {
  color: string;
}

export interface IPokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  moves: IPokemonMove[];
  stats: IPokemonStat[];
  types: IPokemonType[];
  sprites: IPokemonSprites;
}

export interface IPokemonMove {
  name: string;
  url: string;
}

export interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface IPokemonSprites {
  back_default: string | null;
  back_shiny: string | null;
  back_female: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_femaile: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny_femaile: string | null;
      front_shiny_female: string | null;
    };
    "official-artwork": {
      front_default: string | null;
    };
  };
}
