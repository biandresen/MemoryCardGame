import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function GameTipButton() {
  const [tipIsOpen, setTipIsOpen] = useState(false);

  return (
    <>
      {tipIsOpen ?
        <div className="tip-container">
          <p className="tip-message">
            Play the game by <br /> clicking pictures. <br />
            Don't click the same <br /> picture or you will lose.
          </p>
        </div>
      : null}

      <button
        className="game-tip-button"
        onClick={() => {
          setTipIsOpen(!tipIsOpen);
        }}
      >
        <FontAwesomeIcon icon={faQuestion} />
      </button>
    </>
  );
}
