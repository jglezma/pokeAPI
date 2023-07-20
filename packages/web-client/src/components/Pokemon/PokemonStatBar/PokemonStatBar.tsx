import { POKEMON_STATS_CODE } from "@/utils";
import "./PokemonStatBar.styles.css";

interface PokemonStatBarProps {
  name: string;
  color: string;
  barValue: number;
}

function PokemonStatBar({ name, color, barValue }: PokemonStatBarProps) {
  return (
    <div className="component-pokemon-stat-bar">
      <p className="pokemon-stat-name" style={{ color }}>
        {POKEMON_STATS_CODE.hasOwnProperty(name)
          ? POKEMON_STATS_CODE[name]
          : "---"}
      </p>
      <div className="split" />
      <div className="bar-container" style={{ backgroundColor: `${color}4C` }}>
        <div
          className="bar"
          style={{ width: `${barValue}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default PokemonStatBar;
