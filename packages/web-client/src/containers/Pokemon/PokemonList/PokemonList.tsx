import { RefObject } from "react";
import {
  NoMorePokemon,
  PokemonCard,
  PokemonInstructions,
  PokemonPokeballLoader,
} from "@/components";
import "./PokemonList.styles.css";
import { useCapturePokemon, usePokemonList } from "@/hooks";
import { getUsername } from "@/utils";

function PokemonList() {
  const { isLoading, isFetching, externalRef, pokemons, nextPokemonPage } =
    usePokemonList();

  const capturePokemon = useCapturePokemon(pokemons);

  if (isLoading) {
    return (
      <div className="loader-container">
        <PokemonPokeballLoader />
      </div>
    );
  }

  return (
    <>
      <h1 className="welcome-message">Welcome {getUsername()}</h1>
      <PokemonInstructions
        capturedPokemons={Object.keys(capturePokemon.capturedPokemons).length}
      />
      <div className="container-pokemon-list">
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            pokemon={pokemon}
            key={`poke-card-test-${pokemon.id}-${index}`}
            onCapture={capturePokemon.handleCapturePokemon}
            isCaptured={capturePokemon.capturedPokemons.hasOwnProperty(
              pokemon.id
            )}
          />
        ))}
      </div>
      {isFetching && (
        <div className="loader-container">
          <PokemonPokeballLoader />
        </div>
      )}
      {!isFetching && nextPokemonPage === null && <NoMorePokemon />}
      <div ref={externalRef as RefObject<HTMLDivElement>} />
    </>
  );
}

export default PokemonList;
