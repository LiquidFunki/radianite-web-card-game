import React from "react";

import { CardList } from "./CardList";

import "../styles/Counting.css";

function noop() {}

export const Counting = ({ active, userTCards, oppTCards }) => {
  const classes = ["Counting"];

  active ? classes.push("active") : classes.push("");

  return (
    <div className={classes.join(" ")}>
      <div
        className={active ? "countingContainer active" : "countingContainer"}
      >
        <CardList
          classes={["TableList", "user"]}
          cards={oppTCards}
          setPopupCard={noop}
          side="CountingSide"
          placement="true"
        />
        <CardList
          classes={["TableList", "user"]}
          cards={userTCards}
          setPopupCard={noop}
          side="CountingSide"
          placement="true"
        />
      </div>
    </div>
  );
};
