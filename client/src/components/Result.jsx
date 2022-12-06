import React from "react";

import "../styles/Result.css";
import win from "../assets/Victory.png";
import lose from "../assets/Defeat.png";
import draw from "../assets/Draw.png";

export const Result = ({ status, active }) => {
  let displayName = draw;
  const classes = ["Result"];

  if (status === "lose") {
    displayName = lose;
    classes.push("ResBackL");
  } else if (status === "win") {
    displayName = win;
    classes.push("ResBackW");
  } else {
    classes.push("ResBackD");
  }

  active ? classes.push("active") : classes.push("");

  return (
    <div className={classes.join(" ")}>
      <img
        className={active ? "ResultContainer active" : "ResultContainer"}
        src={displayName}
        alt=""
      />
    </div>
  );
};
