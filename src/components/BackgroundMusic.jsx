import { useState, useRef } from "react";

export default function BackgroundMusic({ src }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio(src)); // Ref to persist the same Audio instance

  const toggleMusic = () => {
    const audio = audioRef.current;
    audio.loop = true;
    playing ? audio.pause() : audio.play();
    setPlaying(!playing);
  };

  return <button onClick={toggleMusic}>{playing ? "Pause" : "Play"}</button>;
}
