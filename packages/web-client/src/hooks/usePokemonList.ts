import { selectNextPokemonsPage } from "./../store/reducer/pokemonReducer";
import { useRef, useState, useEffect } from "react";
import { useGetPokemonsQuery } from "@/services";
import { selectPokemons } from "@/store/reducer/pokemonReducer";
import debounce from "just-debounce-it";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import useNearScreen from "./useNearScreen";

function usePokemonList() {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const pokemons = useAppSelector(selectPokemons);
  const nextPokemonPage = useAppSelector(selectNextPokemonsPage);
  const externalRef = useRef(null);

  const {
    data: responsePokemons,
    isFetching,
    isLoading,
  } = useGetPokemonsQuery(page, {
    refetchOnMountOrArgChange: true,
  });

  const { isNearScreen } = useNearScreen({
    once: false,
    distance: 800,
    externalRef: isLoading || isFetching ? null : externalRef,
  });

  // Get pokemons next page when is near to the end of the page
  useEffect(() => {
    let mounted = true;

    const getDataPokemons = debounce(() => {
      setPage((prevPage) => {
        if (!isFetching && !isLoading) {
          return prevPage + 1;
        }
        return prevPage;
      });
    }, 200);

    const hasNextPokemonPage = Boolean(
      responsePokemons === undefined || responsePokemons.next !== null
    );
    const canGetNextPokemonsPage =
      mounted &&
      isNearScreen &&
      hasNextPokemonPage &&
      !isFetching &&
      !isLoading;

    if (canGetNextPokemonsPage) {
      getDataPokemons();
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, isNearScreen, responsePokemons, isFetching, isLoading]);

  return { isLoading, isFetching, pokemons, externalRef, nextPokemonPage };
}

export default usePokemonList;
