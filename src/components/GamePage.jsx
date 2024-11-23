import "../styles/gamePage.css";
import { GameLogo } from "./WelcomePage";
import PokemonList from "./PokemonList";
import { useState, useEffect } from "react";
import pikachu from "../assets/images/pikachuLoading.png";

export default function GamePage({ playFlip, setIsWinner }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedPokemons, setClickedPokemons] = useState([]);

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

  function playRound(e) {
    const currentPokemon = e.target.alt;
    const isClicked = clickedPokemons.some(
      (pokemon) => pokemon == currentPokemon
    );

    if (isClicked) {
      setScore(0);
      setClickedPokemons([]);
    } else {
      setClickedPokemons((c) => [...c, currentPokemon]);
      setScore((s) => s + 1);
      score >= highScore && setHighScore(1 + score);
      score === pokemons.length - 1 && setIsWinner(true);
    }
  }

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
                name={pokemon.name.toUpperCase()}
                image={pokemon.sprites.front_default}
                playRound={playRound}
                playFlip={playFlip}
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
      <div>
        <h2 className="score-header">Score: {score}</h2>
        <h2 className="high-score-header">High Score: {highScore} </h2>
      </div>
      <img className="score-image" src={pikachu} alt={pikachu} />
    </div>
  );
}

function Card({ name, image, playRound, playFlip }) {
  return (
    <div className="card">
      <h3 className="card-name">{name}</h3>
      <img
        onClick={(e) => {
          playRound(e), playFlip();
        }}
        src={image}
        alt={name}
        className="card-image"
      />
    </div>
  );
}
