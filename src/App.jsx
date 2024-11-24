import backgroundVideo from "./assets/images/PokemonWallpaper.mp4";
import backgroundMusic from "./assets/audio/backgroundMusic.mp3";
import clickSound from "./assets/audio/clickSound.mp3";
import flipSound from "./assets/audio/flipSound.mp3";
import winnerSound from "./assets/audio/winnerSound.mp3";
import loadingImage from "./assets/images/pikachuLoading.png";
import "./styles/reset.css";
import "./styles/app.css";
import "./styles/gameTipButton.css";
import BackgroundVideo from "./components/BackgroundVideo";
import BackgroundMusic from "./components/BackgroundMusic";
import Header from "./components/Header";
import LoadingPage from "./components/LoadingPage";
import WelcomePage from "./components/WelcomePage";
import Footer from "./components/Footer";
import GamePage from "./components/GamePage";
import GameTipButton from "./components/GameTipButton";
import GameOverPage from "./components/GameOverPage";
import { useState, useEffect } from "react";
const loadingImageName = "pikachu";

export default function App() {
  const [isLoadingOver, setIsLoadingOver] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  const [gameInProgress, setGameInProgress] = useState(false);
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimationClass("slide-out");
      setTimeout(() => setIsLoadingOver(true), 500);
    }, 3000);
  }, []);

  const playClick = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.7;
    audio.play();
  };

  const playFlip = () => {
    const audio = new Audio(flipSound);
    audio.play();
  };

  const playWinner = () => {
    const audio = new Audio(winnerSound);
    audio.play();
  };

  const resetGame = () => {
    setGameInProgress(true);
    setIsWinner(false);
  };

  isWinner && playWinner();

  return (
    <>
      {!isLoadingOver ?
        <LoadingPage
          classChange={animationClass}
          src={loadingImage}
          srcName={loadingImageName}
        />
      : <>
          {" "}
          {!gameInProgress ?
            <WelcomePage
              playClick={playClick}
              setGameInProgress={setGameInProgress}
            />
          : !isWinner && (
              <GamePage
                playClick={playClick}
                playFlip={playFlip}
                setIsWinner={setIsWinner}
              />
            )
          }
        </>
      }

      {isWinner && <GameOverPage playClick={playClick} resetGame={resetGame} />}
      <Header />
      <Footer />
      <BackgroundVideo src={backgroundVideo} />
      <BackgroundMusic playClick={playClick} src={backgroundMusic} />
      <GameTipButton playClick={playClick} />
    </>
  );
}
