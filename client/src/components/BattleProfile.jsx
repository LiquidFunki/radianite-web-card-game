import React, { useEffect, useState } from "react";
import { chooseAvatar } from "../tools/avatar";
import "../styles/BattleProfile.css";

import defaultAvatar from "../assets/avatars/default.png";
import HPIcon from "../assets/Valorant_Points.png";
import RPIcon from "../assets/Radianite_Points.png";

export const BattleProfile = ({ Login, RP, HP, Avatar }) => {
  const [avatar, setAvatar] = useState(defaultAvatar);

  useEffect(() => {
    chooseAvatar(Avatar, setAvatar, Login);
  }, [Avatar, Login, setAvatar]);

  return (
    <div className="ProfileBlock">
      <div className="AvatarProfileBlock">
        <img className="ImgProfileBlock" src={avatar} alt="avatar" />
      </div>
      <div className="row InfoProfileBlock">
        <div className="col s12 LoginProfileBlock">
          <span>{Login}</span>
        </div>
        <div className="col s6 HpProfileBlock">
          <img className="ImgInfoProfileBlock" src={HPIcon} alt="HP" />
          <span>{HP}</span>
          <span className="HP">{"Hp"}</span>
        </div>
        <div className="col s6 RpProfileBlock">
          <img className="ImgInfoProfileBlock" src={RPIcon} alt="RP" />
          <span>{RP}</span>
          <span className="RP">{"RP"}</span>
        </div>
      </div>
    </div>
  );
};
