import backgroundVideo from "./assets/images/PokemonWallpaper.mp4";
import backgroundMusic from "./assets/audio/backgroundMusic.mp3";
import "./styles/reset.css";
import "./styles/app.css";

import BackgroundVideo from "./components/BackgroundVideo";
import BackgroundMusic from "./components/BackgroundMusic";

export default function App() {
  return (
    <>
      <div></div>

      <BackgroundVideo src={backgroundVideo} />
      <BackgroundMusic src={backgroundMusic} />
    </>
  );
}
