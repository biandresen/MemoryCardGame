import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import "../styles/gameTipButton.css";
import { useState } from "react";
import pikachu from "../assets/images/pikachu.png";

export default function GameTipButton({ playClick }) {
  const [tipIsOpen, setTipIsOpen] = useState(false);

  return (
    <>
      <div
        style={tipIsOpen ? { display: "block" } : null}
        className="overlay"
      ></div>
      {tipIsOpen ?
        <div className="tip-container">
          <p className="tip-message">
            Play the game by <br /> clicking pictures. <br />
            Don't click the same or <br /> you'll have to start again.
          </p>
          <img className="tip-image" src={pikachu} alt={pikachu} />
        </div>
      : null}

      <button
        className="game-tip-button"
        onClick={() => {
          setTipIsOpen(!tipIsOpen);
          playClick();
        }}
      >
        <FontAwesomeIcon icon={faQuestion} />
      </button>
    </>
  );
}
