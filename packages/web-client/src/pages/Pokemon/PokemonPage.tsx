import { PokemonList } from "@/containers";
import { getUsername, setUsername } from "@/utils";
import { useEffect, useState } from "react";
import "./PokemonPage.styles.css";

function PokemonPage() {
  const [hasUsername, setHasUsername] = useState<boolean>(false);

  useEffect(() => {
    const savedUsername = getUsername();
    // Set the username for the user
    if (savedUsername === null) {
      const newName = prompt("Enter your username to get your progress");
      if (newName) {
        setUsername(newName);
        setHasUsername(true);
      }
    } else {
      setHasUsername(true);
    }
  }, []);

  if (!hasUsername) {
    return null;
  }

  return (
    <div className="page-pokemon-container">
      <PokemonList />
    </div>
  );
}

export default PokemonPage;
