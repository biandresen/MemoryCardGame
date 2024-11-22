import { useState, useEffect } from "react";

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const data = await response.json();
      // Fetch details for each Pokémon (to get images)
      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemons(detailedData);
    };
    fetchPokemons();
  }, []);

  return pokemons;
}
