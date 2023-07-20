import type { IPokemonAdapted } from "@/models";
import { useEffect, useState } from "react";
import { socket, useCapturePokemonMutation } from "@/services";
import { getUsername } from "@/utils";
import { toast } from "react-toastify";

function useCapturePokemon(pokemons: IPokemonAdapted[]) {
  const [capturedPokemons, setCapturedPokemons] = useState<
    Record<number, boolean>
  >({});

  const [capturePokemonAction, { isLoading }] = useCapturePokemonMutation();

  const handleCapturePokemon = async (pokemonId: number) => {
    const username = getUsername();
    try {
      if (username) {
        await capturePokemonAction({ username, pokemonId });
        return;
      }
      alert("You must have an username, please refresh the page");
    } catch (e) {
      toast("Server error", {
        theme: "colored",
        type: "error",
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Ask for the pokemons we did already captured
  useEffect(() => {
    const username = getUsername();
    if (!username) return;
    socket.emit("get-pokemons-by-username", username);
  }, []);

  // Wait for the server response about the pokemons we did already captured
  useEffect(() => {
    const username = getUsername();
    if (!username) return;

    socket.on(
      `set-captured-pokemons-${username}`,
      (pokemonsOnDB: Record<number, boolean>) => {
        setCapturedPokemons((prevPokemons) => {
          if (
            Object.keys(pokemonsOnDB).length !==
            Object.keys(prevPokemons).length
          ) {
            return pokemonsOnDB;
          }
          return prevPokemons;
        });
      }
    );
    return () => {
      socket.off(`set-captured-pokemons-${username}`);
    };
  }, []);

  // Listen for other clients with my username that captured a pokemon to sync
  useEffect(() => {
    const username = getUsername();
    if (!username) return;
    if (pokemons.length === 0) return;

    socket.off(`captured-pokemon-${username}`);

    socket.on(`captured-pokemon-${username}`, (pokemonId: number) => {
      const pokemonById = pokemons.filter(
        (pokemon) => pokemon.id === pokemonId
      );
      const namePokemon =
        pokemonById.length > 0
          ? pokemonById[0].name.toLocaleUpperCase()
          : "new pokemon";
      toast(`You catched a ${namePokemon}`, {
        theme: "colored",
        type: "success",
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: true,
        progress: undefined,
      });
      setCapturedPokemons((prevCapturedPokemons) => ({
        ...prevCapturedPokemons,
        [pokemonId]: true,
      }));
    });

    return () => {
      socket.off(`conneciton-${username}`);
    };
  }, [pokemons]);

  return { capturedPokemons, handleCapturePokemon, isLoading };
}

export default useCapturePokemon;
