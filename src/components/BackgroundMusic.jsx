import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import "../styles/musicButton.css";

export default function BackgroundMusic({ playClick, src }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(new Audio(src)); // Ref to persist the same Audio instance

  const toggleMusic = () => {
    const audio = audioRef.current;
    audio.loop = true;
    playing ? audio.pause() : audio.play();
    setPlaying(!playing);
  };

  return (
    <>
      <button
        className="music-button"
        onClick={() => {
          toggleMusic(), playClick();
        }}
      >
        {playing ?
          <FontAwesomeIcon icon={faVolumeHigh} />
        : <FontAwesomeIcon icon={faVolumeXmark} />}
      </button>
    </>
  );
}
