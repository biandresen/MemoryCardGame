import "../styles/welcomePage.css";

export default function WelcomePage({ playClick, setGameInProgress }) {
  return (
    <>
      <div className="welcome-container">
        <GameLogo />
        <button
          onClick={() => {
            setGameInProgress(true);
            playClick();
          }}
          className="button start-game-button"
        >
          START GAME
        </button>
      </div>
    </>
  );
}

export function GameLogo() {
  return (
    <div className="game-logo">
      <p className="game-logo-header">PoKéMoN</p>
      <p className="game-logo-text">Memory Game</p>
    </div>
  );
}
