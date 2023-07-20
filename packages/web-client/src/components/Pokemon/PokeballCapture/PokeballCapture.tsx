import { ReactComponent as PokeballIcon } from "@/assets/icons/PokeballIcon.svg";
import { ReactComponent as StarIcon } from "@/assets/icons/Star.svg";
import { socket } from "@/services";
import { getUsername } from "@/utils";
import { useEffect, useState } from "react";
import "./PokeballCapture.styles.css";

interface PokeballCaptureProps {
  isCaptured?: boolean;
  pokemonId: number;
  onClick: (pokemonId: number) => void;
}

function PokeballCapture({
  isCaptured = false,
  onClick,
  pokemonId,
}: PokeballCaptureProps) {
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [wasCaptured, setWasCaptured] = useState<boolean>(false);

  // Socket to know if a pokemon is being captured
  useEffect(() => {
    const username = getUsername();
    socket.on(`capturing-pokemon-${pokemonId}-${username}`, () => {
      setIsCapturing(true);
    });
  }, [pokemonId]);

  useEffect(() => {
    let mounted = true;
    if (isCapturing && isCaptured) {
      setIsCapturing(false);
      setWasCaptured(true);
      setTimeout(() => {
        if (mounted) {
          setWasCaptured(false);
        }
      }, 3000);
    }
    return () => {
      mounted = false;
    };
  }, [isCaptured, isCapturing]);

  return (
    <div
      className={`component-pokeball-capture component-pokeball-capture--${
        isCaptured
          ? "captured"
          : isCapturing
          ? "capturing"
          : wasCaptured
          ? "wasCaptured"
          : "tocapture"
      }`}
    >
      {!isCaptured && !isCapturing && !wasCaptured && (
        <div
          className="component-pokeball-button-tocapture"
          onClick={() => {
            onClick(pokemonId);
          }}
        />
      )}
      {wasCaptured && (
        <div className="stars-container">
          {new Array(3).fill(0).map((star, index) => (
            <div
              className={`star star${index + 1}`}
              key={`pokemon-${pokemonId}-star-${index}`}
            >
              <StarIcon id={`star${index + 1}`} />
            </div>
          ))}
        </div>
      )}
      <PokeballIcon className="pokeball-icon" />
    </div>
  );
}

export default PokeballCapture;
