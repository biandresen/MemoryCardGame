import "../styles/gamePage.css";
import { GameLogo } from "./WelcomePage";

export default function GamePage({
  score,
  highScore,
  setScore,
  setHighScore,
  playFlip,
}) {
  return (
    <>
      <div className="game-page-container">
        <GameLogo />
        <ScoreContainer score={score} highScore={highScore} />
        <div className="card-container">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}

function ScoreContainer({ score, highScore }) {
  return (
    <div className="score-container">
      <h2 className="score-header">Score: {score}</h2>
      <h2 className="high-score-header">High Score: {highScore} </h2>
    </div>
  );
}

function Card() {
  return (
    <div className="card">
      <img src="" alt="" />
      <h3>Pokemon Name</h3>
    </div>
  );
}
