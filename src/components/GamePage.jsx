import "../styles/gamePage.css";
import { GameLogo } from "./WelcomePage";
import PokemonList from "./PokemonList";
import { useState, useEffect } from "react";

export default function GamePage({
  score,
  highScore,
  setScore,
  setHighScore,
  playFlip,
}) {
  const [pokemons, setPokemons] = useState([]); // State for Pokémon data
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Fetch Pokémon on component mount
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const fetchedPokemons = await PokemonList();
        setPokemons(fetchedPokemons);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <>
      <div className="game-page-container">
        <GameLogo />
        <ScoreContainer score={score} highScore={highScore} />

        {loading ?
          <div>Loading Pokémon...</div>
        : <div className="card-container">
            {pokemons.map((pokemon) => (
              <Card
                key={pokemon.name}
                name={pokemon.name}
                image={pokemon.sprites.front_default} // Use `front_default` or another available sprite
              />
            ))}
          </div>
        }
      </div>
    </>
  );
}

function ScoreContainer({ score, highScore }) {
  return (
    <div className="score-container">
      <h2 className="score-header">Score: {score}</h2>
      <h2 className="high-score-header">High Score: {highScore} </h2>
    </div>
  );
}

function Card({ name, image }) {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <h3 className="card-name">{name}</h3>
    </div>
  );
}
