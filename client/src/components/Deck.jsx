import React, { useEffect, useState, useContext } from "react";
import { BattleContext } from "../contexts/BattleContext";
import deckPng from "../assets/deck.png";
import "../styles/Deck.css";

export const Deck = () => {
  const { socket } = useContext(BattleContext);
  const [deckLength, setDeckLength] = useState(36);
  useEffect(() => {
    socket.on("getDeckLength", (data) => {
      setDeckLength(data);
    });
  }, [socket]);
  return (
    <div class="deck">
      <img class="deckImage" src={deckPng} alt="" />
      <h2 class="deckLength">{deckLength}</h2>
    </div>
  );
};
