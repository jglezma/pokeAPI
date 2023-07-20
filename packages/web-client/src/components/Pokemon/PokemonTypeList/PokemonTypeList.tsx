import type { IPokemonType } from "@/models";
import { getPokemonColor } from "@/utils";
import PokemonType from "../PokemonType/PokemonType";
import "./PokemonTypeList.styles.css";

interface PokemonTypeListProps {
  name: string;
  types: IPokemonType[];
}

export default function PokemonTypeList({ types, name }: PokemonTypeListProps) {
  return (
    <div className="component-pokemon-type-list">
      {types.map(({ type }) => {
        return (
          <PokemonType
            key={`pokemon-type-${type.name}-${name}`}
            type={type.name}
            backgroundColor={getPokemonColor(type.name)}
          />
        );
      })}
    </div>
  );
}
