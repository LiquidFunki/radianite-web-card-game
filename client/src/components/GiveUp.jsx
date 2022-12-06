import React, { useState } from "react";

import "../styles/GiveUp.css";

export const GiveUp = ({ socket }) => {
  const [message, setMessage] = useState("Give Up");
  return (
    <div className="GiveUpCont">
      <div
        onMouseEnter={() => setMessage("I'm Loser")}
        onMouseLeave={() => setMessage("Give Up")}
        onClick={() => socket.emit("GiveUp")}
        className="GiveUpBtn waves-effect"
      >
        <span className="GiveUpText">{message}</span>
      </div>
    </div>
  );
};
