import backgroundVideo from "./assets/images/PokemonWallpaper.mp4";
import backgroundMusic from "./assets/audio/backgroundMusic.mp3";
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
import GameTipButton from "./components/GameTipButton";
import { useState, useEffect } from "react";
const loadingImageName = "pikachu";

export default function App() {
  const [isLoadingOver, setIsLoadingOver] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setAnimationClass("slide-out");
      setTimeout(() => setIsLoadingOver(true), 500);
    }, 3000);
  }, []);

  return (
    <>
      {!isLoadingOver ?
        <LoadingPage
          classChange={animationClass}
          src={loadingImage}
          srcName={loadingImageName}
        />
      : <WelcomePage />}

      <Header />
      <Footer />
      <BackgroundVideo src={backgroundVideo} />
      <BackgroundMusic src={backgroundMusic} />
      <GameTipButton />
    </>
  );
}
