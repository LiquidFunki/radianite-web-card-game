import React from "react";
import "../styles/CardList.css";
import { Card } from "./Card";

export const CardList = ({ classes, side, setPopupCard, cards, placement }) => {

  return (
    <div className={[...classes, side].join(" ")}>
      {cards.map((data, index) => (
        <Card
          card={data}
          side={side?.toLowerCase()}
          key={index}
          placement={placement}
          setPopupCard={setPopupCard}
          turn={classes.includes('disabledTurn')}     
        />
      ))}
    </div>
  );
};
