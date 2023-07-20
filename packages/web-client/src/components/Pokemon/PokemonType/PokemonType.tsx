import React from "react";
import "./PokemonType.styles.css";

interface IPokemonTypeProps {
  type: string;
  backgroundColor: string;
}

function PokemonType({ type, backgroundColor }: IPokemonTypeProps) {
  return (
    <p className="component-pokemon-type" style={{ backgroundColor }}>
      {type}
    </p>
  );
}

export default PokemonType;
