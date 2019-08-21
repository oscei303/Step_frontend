import React, { useState, useEffect } from "react";
import Tone from "tone";

const Player = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players(
      {
        BD: "/bd05.wav",
        CP: "/sd11.wav",
        OH: "/oh02.wav",
        CH: "/hh02.wav"
      },
      () => {
        console.log("buffers loaded");
        setPlayer(player);
      }
    ).toMaster();
  }, []);

  return children({ player });
};

export default Player;
