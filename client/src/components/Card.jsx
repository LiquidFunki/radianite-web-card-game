import React, { useContext } from "react";
import { MyCard } from "../components/UI/MyCard";
import { BattleContext } from "../contexts/BattleContext";
import "../styles/Card.css";

export const Card = ({ card, setPopupCard, side, placement, turn }) => {
  const { socket } = useContext(BattleContext);
  return (
    <div
      onMouseEnter={() => setPopupCard({ ...card, placement })}
      onMouseLeave={() => setPopupCard(null)}
      onClick={() => {
        if (side === "user" && !turn) {
          socket.emit("moveCard", card);
          setPopupCard(null);
        }
      }}
      className={placement ? "TableCard" : "Card"}
    >
      <MyCard
        classes={placement ? ["CardOnTable", side] : ["CardImg", side]}
        card={card}
      />
    </div>
  );
};
