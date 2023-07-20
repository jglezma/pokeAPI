import { ReactComponent as PokeballIconTransparent } from "@/assets/icons/Pokeball.svg";
import { getPokemonImage } from "@/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PokemonTypeList from "../PokemonTypeList/PokemonTypeList";
import PokemonInfo from "../PokemonInfo/PokemonInfo";
import PokemonListStatBar from "../PokemonListStatBar/PokemonListStatBar";
import type { IPokemonAdapted } from "@/models";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./PokemonCard.styles.css";
import PokeballCapture from "../PokeballCapture/PokeballCapture";

interface IPokemonCardProps {
  pokemon: IPokemonAdapted;
  onCapture: (pokemonId: number) => void;
  isCaptured: boolean;
}

function PokemonCard({ pokemon, onCapture, isCaptured }: IPokemonCardProps) {
  const { types, name, id, weight, height, color, stats } = pokemon;

  return (
    <div
      className="component-pokemon-card"
      style={{
        backgroundColor: color,
      }}
    >
      <div className="pokemon-card-header">
        <PokeballIconTransparent className="pokeball-icon" />
        <p className="pokemon-name">{name}</p>
        <p className="pokemon-id">#{id}</p>
      </div>
      <div className="pokemon-card-body">
        <LazyLoadImage
          src={getPokemonImage(pokemon)}
          alt={`Pokemon ${name}`}
          className="pokemon-image"
          delayMethod={"debounce"}
          effect="blur"
          placeholderSrc={
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
          }
        />
        <PokemonTypeList name={name} types={types} />
        <div className="pokemon-info-container">
          <PokemonInfo type="weight" value={weight} />
          <PokemonInfo type="height" value={height} />
        </div>
        <p className="pokemon-base-stats-text" style={{ color }}>
          Base stats
        </p>
        <PokemonListStatBar pokemonName={name} color={color} stat={stats} />
        <PokeballCapture
          isCaptured={isCaptured}
          onClick={onCapture}
          pokemonId={id}
        />
      </div>
    </div>
  );
}

export default PokemonCard;
