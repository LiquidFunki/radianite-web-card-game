import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Home.css";

export const Home = () => {
  return (
    <div className="row Animation">
      <div className="col s12 homeInfo">
        <h2 style={{ color: "white", textAlign: "center" }}>
          Battle for Radianite
        </h2>
        <div className="AttInfo">
          <p
            style={{
              color: "orangered",
              fontWeight: "bold",
              fontSize: "2.5vh",
            }}
          >
            Attention!
          </p>
          <p>
            Our&nbsp; "card-game",&nbsp; "Battle&nbsp; for&nbsp;
            Radianite",&nbsp; was&nbsp; created&nbsp; under&nbsp; Riot&nbsp;
            Games'&nbsp;{" "}
            <a href="https://www.riotgames.com/en/legal" target="blank">
              Legal&nbsp; Jibber&nbsp; Jabber"&nbsp;
            </a>{" "}
            policy&nbsp; using&nbsp; assets&nbsp; owned&nbsp; by&nbsp;
            Riot&nbsp; Games.&nbsp; Riot&nbsp; Games&nbsp; does&nbsp; not&nbsp;
            endorse&nbsp; or&nbsp; sponsor&nbsp; this&nbsp; project.&nbsp;
            We&nbsp; used&nbsp; intellectual&nbsp; property&nbsp; of&nbsp;
            Riot&nbsp; Games&nbsp; to&nbsp; create&nbsp; this&nbsp; fan&nbsp;
            project&nbsp; for&nbsp; non-commercial&nbsp; use.
          </p>
        </div>
      </div>
      <div className="col s4 homeRules">
        <NavLink to="/rules" className="homeRulesBtn waves-effect animCls">
          Check rules
        </NavLink>
      </div>
      <div className="col s4 homeStart">
        <NavLink to="/battle" className="homeStartBtn waves-effect animCls">
          Start game!
        </NavLink>
      </div>
      <div className="col s4 homeRick">
        <a
          className="homeRickBtn waves-effect animCls"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Use cheats
        </a>
      </div>
      <div className="col s12">
        <h4
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Developers
        </h4>
      </div>
      <div className="col s12 homeDevs">
        <a
          className="homeDev waves-effect"
          href="https://github.com/Vlad-Makarenko"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="DevImgCont">
            <img
              className="DevImg"
              src="https://lms.khpi.ucode-connect.study/media/profile_photo/vmakarenko.png"
              alt=""
            />
          </div>
          <p className="DevName">Vlad</p>
          <p
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            Member&nbsp; of&nbsp; Innovation&nbsp; campus&nbsp; from&nbsp;{" "}
            <a href="https://ucode.world/en/it-world/" target="blank">
              UCODe&nbsp; it&nbsp; academy&nbsp;
            </a>
          </p>
        </a>
        <a
          className="homeDev waves-effect"
          href="https://github.com/LiquidFunki"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="DevImgCont">
            <img
              className="DevImg"
              src="https://lms.khpi.ucode-connect.study/media/profile_photo/yklymenko.png"
              alt=""
            />
          </div>

          <p className="DevName">Yura</p>
          <p
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            Member&nbsp; of&nbsp; Innovation&nbsp; campus&nbsp; from&nbsp;{" "}
            <a href="https://ucode.world/en/it-world/" target="blank">
              UCODe&nbsp; it&nbsp; academy&nbsp;
            </a>
          </p>
        </a>
      </div>
    </div>
  );
};
