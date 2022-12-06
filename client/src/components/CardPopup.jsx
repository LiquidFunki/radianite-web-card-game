import React from "react";

import "../styles/Card.css";
import { MyCard } from "./UI/MyCard";

export const CardPopup = ({ popupCard }) => {

  return (
    <div className="popupCard">
      <MyCard classes={popupCard.placement === 'true' ? ["popupImg"] : ["popupImg", 'user']} card={popupCard} />
    </div>
  );
};
