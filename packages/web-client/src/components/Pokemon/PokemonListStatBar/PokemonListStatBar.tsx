import { IPokemonStat } from "@/models";
import PokemonStatBar from "../PokemonStatBar/PokemonStatBar";
import "./PokemonListStatBar.styles.css";

interface PokemonListStatBarProps {
  pokemonName: string;
  color: string;
  stat: IPokemonStat[];
}

function PokemonListStatBar({
  pokemonName,
  color,
  stat,
}: PokemonListStatBarProps) {
  return (
    <div className="component-pokemon-list-stat-bar">
      {stat.map((currentStat) => {
        return (
          <PokemonStatBar
            key={`pokemon-${pokemonName}-stat-${currentStat.stat.name}`}
            name={currentStat.stat.name}
            color={color}
            barValue={currentStat.base_stat}
          />
        );
      })}
    </div>
  );
}

export default PokemonListStatBar;
