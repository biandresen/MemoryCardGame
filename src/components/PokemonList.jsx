export default async function PokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");

  const data = await response.json();

  const detailedData = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );
  return detailedData;
}
