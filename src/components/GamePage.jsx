import "../styles/gamePage.css";
import errorSound from "../assets/audio/errorSound.mp3";
import pointSound from "../assets/audio/pointSound.mp3";
import PokemonList from "./PokemonList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import pikachu from "../assets/images/pikachuLoading.png";
import firstGenPokemons from "../assets/firstGenPokemons.json";

const MAXOFFSET = 139;

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

  const handleOffSetAffirm = () => {
    let offsetValue = Number(document.getElementById("offset-input").value);
    if (offsetValue > MAXOFFSET) offsetValue = MAXOFFSET;
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
        <div className="game-logo">
          <p className="game-logo-header">PoKéMoN</p>
          <p className="game-logo-text">Memory Game</p>
        </div>
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
    <div className="offset-container">
      <div className="offset-input-container">
        <label htmlFor="offset-input">Choose pokemon offset-nr:</label>
        <div>
          <input
            id="offset-input"
            inputMode="numeric"
            type="number"
            placeholder="0-139"
          />
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
      </div>
      <ListOfPokemons />
    </div>
  );
}

function ListOfPokemons() {
  const dropdownPokemonList = firstGenPokemons;
  return (
    <div className="dropdown-menu">
      <h2>1.Generation Pokémons: </h2>
      <ol className="pokemon-list">
        {Object.entries(dropdownPokemonList).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ol>
    </div>
  );
}
