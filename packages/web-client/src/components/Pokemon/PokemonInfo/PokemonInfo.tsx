import { ReactComponent as WeightIcon } from "@/assets/icons/Weight.svg";
import { ReactComponent as HeightIcon } from "@/assets/icons/Height.svg";
import "./PokemonInfo.styles.css";

interface PokemonInfoProps {
  type?: "weight" | "height";
  value?: number;
}

function PokemonInfo({ type = "weight", value = 6.9 }: PokemonInfoProps) {
  return (
    <div className="component-pokemon-info">
      <p className="pokemon-info-type">
        {type === "weight" ? <WeightIcon /> : <HeightIcon />}
        <span>{value}kg</span>
      </p>
      <p className="pokemon-info-value">weight</p>
    </div>
  );
}

export default PokemonInfo;
