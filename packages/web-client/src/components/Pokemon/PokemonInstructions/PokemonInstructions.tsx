import "./PokemonInstructions.styles.css";
import { ReactComponent as PockeballIcon } from "@/assets/icons/PokeballIcon.svg";

interface PokemonInstructionsProps {
  capturedPokemons: number;
}

function PokemonInstructions({ capturedPokemons }: PokemonInstructionsProps) {
  return (
    <div className="component-pokemon-instructions">
      <p>
        <span>
          Press the
          <PockeballIcon width={32} height={32} />
          to capture a pokemon!
        </span>
        <span>Captured {capturedPokemons}/1354</span>
      </p>
    </div>
  );
}

export default PokemonInstructions;
