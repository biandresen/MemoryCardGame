import backgroundVideo from "./assets/images/PokemonWallpaper.mp4";
import backgroundMusic from "./assets/audio/backgroundMusic.mp3";
import "./styles/reset.css";
import "./styles/app.css";

import BackgroundVideo from "./components/BackgroundVideo";
import BackgroundMusic from "./components/BackgroundMusic";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Footer />
      <BackgroundVideo src={backgroundVideo} />
      <BackgroundMusic src={backgroundMusic} />
    </>
  );
}
