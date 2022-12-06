import React from "react";

export const Loader = ({ info }) => (
  <div>
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "4rem" }}
    >
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "center" }}>
      <h1 style={{ color: "white" }}>{info}</h1>
    </div>
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
    >
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    </div>
  </div>
);
