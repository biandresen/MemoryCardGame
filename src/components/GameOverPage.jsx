import "../styles/gameOverPage.css";
import winnerImage from "../assets/images/pikachu.png";

export default function GameOverPage({ playClick, resetGame }) {
  return (
    <div className="game-over-container">
      <h2 className="game-over-heading">WINNER!</h2>
      <img className="game-over-image" src={winnerImage} alt={winnerImage} />
      <p className="game-over-text">
        Congratulations! <br /> What do you think of your memory skills?
      </p>
      <button
        onClick={() => {
          playClick();
          resetGame();
        }}
        className="replay-button"
      >
        Try again
      </button>
    </div>
  );
}
