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
        T1: "/522_MoogDrive_Tom1_SP.wav",
        T2: "/522_MoogDrive_Tom2_SP.wav",
        T3: "/522_MoogDrive_Tom3_SP.wav"
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
