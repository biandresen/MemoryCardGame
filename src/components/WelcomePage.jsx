import "../styles/welcomePage.css";

export default function WelcomePage() {
  return (
    <>
      <div className="welcome-container">
        <GameLogo />
        <button className="button start-game-button">START GAME</button>
      </div>
    </>
  );
}

function GameLogo() {
  return (
    <div className="game-logo">
      <p className="game-logo-header">PoKéMoN</p>
      <p className="game-logo-text">Memory Game</p>
    </div>
  );
}
