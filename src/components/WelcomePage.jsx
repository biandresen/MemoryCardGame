import "../styles/welcomePage.css";

export default function WelcomePage({ playClick, setGameInProgress }) {
  return (
    <>
      <div className="welcome-container">
        <div className="game-logo-welcome">
          <p className="game-logo-header-welcome">PoKéMoN</p>
          <p className="game-logo-text-welcome">Memory Game</p>
        </div>
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
