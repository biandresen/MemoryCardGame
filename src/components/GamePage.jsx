import "../styles/gamePage.css";
import errorSound from "../assets/audio/errorSound.mp3";
import pointSound from "../assets/audio/pointSound.mp3";
import { GameLogo } from "./WelcomePage";
import PokemonList from "./PokemonList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import pikachu from "../assets/images/pikachuLoading.png";

export default function GamePage({ playClick, setIsWinner }) {
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
    setScore(0);
    setClickedPokemons([]);
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
      playError();
    } else {
      playPoint();
      setClickedPokemons((c) => [...c, currentPokemon]);
      setScore((s) => s + 1);
      score >= highScore && setHighScore(1 + score);
      score === pokemons.length - 1 && setIsWinner(true);
    }

    setPokemons(pokemons.sort(() => Math.random() - 0.5));
  }

  const playError = () => {
    const audio = new Audio(errorSound);
    audio.volume = 0.7;
    audio.play();
  };

  const playPoint = () => {
    const audio = new Audio(pointSound);
    audio.play();
  };

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
      <div
        style={offSetMenuOpen ? { display: "block" } : null}
        className="overlay"
      ></div>
      <div className="game-page-container">
        <GameLogo />
        <ScoreContainer score={score} highScore={highScore} />
        {loading ?
          <div className="loading-pokemons-text">Loading Pokémons...</div>
        : <div className="card-container">
            {pokemons.map((pokemon) => (
              <Card
                key={pokemon.name}
                name={pokemon.name.toUpperCase()}
                image={pokemon.sprites.front_default}
                playRound={playRound}
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
          setOffsetMenuOpen={setOffSetMenuOpen}
        />
      )}
    </>
  );
}

function ScoreContainer({ score, highScore }) {
  return (
    <div className="score-container">
      <div className="score-text">
        <h2 className="score-header">Score: {score}</h2>
        <h2 className="high-score-header">High Score: {highScore} </h2>
      </div>
      <img className="score-image" src={pikachu} alt={pikachu} />
    </div>
  );
}

function Card({ name, image, playRound }) {
  return (
    <div className="card">
      <h3 className="card-name">{name}</h3>
      <img
        onClick={(e) => {
          playRound(e);
        }}
        src={image}
        alt={name}
        className="card-image"
      />
    </div>
  );
}

function OffSetMenu({ playClick, handleOffSetAffirm, setOffsetMenuOpen }) {
  return (
    <>
      <div className="offset-container">
        <label htmlFor="offset-input">Choose pokemon offset-nr:</label>
        <input id="offset-input" type="number" min="0" max="1290" />
        <button
          onClick={() => {
            playClick();
            handleOffSetAffirm();
            setOffsetMenuOpen(false);
          }}
          className="offset-affirm-button"
        >
          OK
        </button>
      </div>
    </>
  );
}
