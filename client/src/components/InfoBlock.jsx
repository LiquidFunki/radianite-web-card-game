import React from "react";

import "../styles/InfoBlock.css";

export const InfoBlock = ({ turn, userTimer = "00:00", action }) => {
  let btnClasses = ["waves-effect", "waves-light", "TurnButton"]
  turn ? btnClasses.push("btnActive") :  btnClasses.push("");
  return (
    <div className="InfoBlock">
      {/* <div className="col s12 OppTimer">
        <span>{oppTimer}</span>
      </div> */}
      <div className="col s12 TurnBlock">
        <button
          className={btnClasses.join(' ')}
          onClick={action}
          disabled={!turn}
        ></button>
      </div>
      <div className="col s12 TextInfBlock">
        {turn ? (
          <span className="TurnText" style={{ color: "greenyellow" }}>
            Your turn
          </span>
        ) : (
          <span className="TurnText" style={{ color: "red" }}>
            Opponent turn
          </span>
        )}
      </div>

      <div className="col s12 UserTimer">
        <span>{userTimer}</span>
      </div>
    </div>
  );
};
