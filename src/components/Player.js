import React, { useState, useEffect } from "react";
import Tone from "tone";

const Player = ({ children }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    const player = new Tone.Players(
      {
        BD: "/MBASEkick02.wav",
        CP: "/909MoogDrive_Clap_SP.wav",
        OH: "/909MoogDrive_OH2_SP.wav",
        CH: "/hh02.wav",
        T1: "/BREAKTOM1.wav",
        T2: "/BREAKTOM2.wav",
        T3: "/BREAKTOM3.wav",
        BR: "/303BASS01.wav"
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
