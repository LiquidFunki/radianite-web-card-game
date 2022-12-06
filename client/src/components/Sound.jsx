import React from "react";
import useSound from 'use-sound';
import soundUrl from '../assets/sounds/menu.wav'

export const Sound = ( ) => {

    const [playbackRate, setPlaybackRate] = React.useState(0.75);
  
    const [play] = useSound(soundUrl, {
      volume: 1,
    });
  
    const handleClick = () => {
      play();
    };
  
    return (
      <button onClick={handleClick}>
        <span role="img" aria-label="Heart">
          💖
        </span>
      </button>
    );
  }