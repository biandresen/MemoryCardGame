import "../styles/gamePage.css";
import { GameLogo } from "./WelcomePage";
import PokemonList from "./PokemonList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import pikachu from "../assets/images/pikachuLoading.png";

export default function GamePage({ playClick, playFlip, setIsWinner }) {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clickedPokemons, setClickedPokemons] = useState([]);
  const [offSetMenuOpen, setOffSetMenuOpen] = useState(false);
  const [offSet, setOffset] = useState(""); //Starting point from which pokemons will get fetched from the API

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const fetchedPokemons = await PokemonList({ offSet });
        setPokemons(fetchedPokemons);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [offSet]);

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

    setPokemons(pokemons.sort(() => Math.random() - 0.5));
  }

  useEffect(() => {
    if (offSetMenuOpen) {
      document.getElementById("offset-input").focus();
    }
  }, [offSetMenuOpen]);

  const handleOffSetAffirm = () => {
    let offsetValue = document.getElementById("offset-input").value;
    setOffset(offsetValue);
    offsetValue = "";
  };

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
      <button
        className="offset-menu-button"
        onClick={() => {
          setOffSetMenuOpen(!offSetMenuOpen);
          playClick();
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      {offSetMenuOpen && (
        <OffSetMenu
          playClick={playClick}
          handleOffSetAffirm={handleOffSetAffirm}
        />
      )}
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

function OffSetMenu({ playClick, handleOffSetAffirm }) {
  return (
    <div className="offset-container">
      <label htmlFor="offset-input">Choose pokemon offset-nr:</label>
      <input id="offset-input" type="number" min="0" max="1290" />
      <button
        onClick={() => {
          playClick();
          handleOffSetAffirm();
        }}
        className="offset-affirm-button"
      >
        OK
      </button>
    </div>
  );
}
