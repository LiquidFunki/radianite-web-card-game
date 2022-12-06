import defaultAvatar from "../assets/avatars/default.png";
import drakyla from "../assets/avatars/drakyla.png";
import kuzya from "../assets/avatars/kuzya.png";
import astra from "../assets/avatars/astra.png";
import breach from "../assets/avatars/breach.png";
import brimstone from "../assets/avatars/brimstone.png";
import cypher from "../assets/avatars/cypher.png";
import jett from "../assets/avatars/jett.png";
import kayo from "../assets/avatars/kayo.png";
import killjoy from "../assets/avatars/killjoy.png";
import omen from "../assets/avatars/omen.png";
import phoenix from "../assets/avatars/phoenix.png";
import raze from "../assets/avatars/raze.png";
import reyna from "../assets/avatars/reyna.png";
import sage from "../assets/avatars/sage.png";
import skye from "../assets/avatars/skye.png";
import sova from "../assets/avatars/sova.png";
import viper from "../assets/avatars/viper.png";
import yoru from "../assets/avatars/yoru.png";

export const options = () => {
  return [
    {
      value: "astra.png",
      label: (
        <div className="selectContainer">
          <img src={astra} alt="" className="avatarImg" />{" "}
          <span className="imgLable">astra</span>
        </div>
      ),
    },
    {
      value: "breach.png",
      label: (
        <div className="selectContainer">
          <img src={breach} alt="" className="avatarImg" />{" "}
          <span className="imgLable">breach</span>
        </div>
      ),
    },
    {
      value: "brimstone.png",
      label: (
        <div className="selectContainer">
          <img src={brimstone} alt="" className="avatarImg" />{" "}
          <span className="imgLable">brimstone</span>
        </div>
      ),
    },
    {
      value: "cypher.png",
      label: (
        <div className="selectContainer">
          <img src={cypher} alt="" className="avatarImg" />{" "}
          <span className="imgLable">cypher</span>
        </div>
      ),
    },
    {
      value: "jett.png",
      label: (
        <div className="selectContainer">
          <img src={jett} alt="" className="avatarImg" />{" "}
          <span className="imgLable">jett</span>
        </div>
      ),
    },
    {
      value: "kayo.png",
      label: (
        <div className="selectContainer">
          <img src={kayo} alt="" className="avatarImg" />{" "}
          <span className="imgLable">kayo</span>
        </div>
      ),
    },
    {
      value: "killjoy.png",
      label: (
        <div className="selectContainer">
          <img src={killjoy} alt="" className="avatarImg" />{" "}
          <span className="imgLable">killjoy</span>
        </div>
      ),
    },
    {
      value: "omen.png",
      label: (
        <div className="selectContainer">
          <img src={omen} alt="" className="avatarImg" />{" "}
          <span className="imgLable">omen</span>
        </div>
      ),
    },
    {
      value: "phoenix.png",
      label: (
        <div className="selectContainer">
          <img src={phoenix} alt="" className="avatarImg" />{" "}
          <span className="imgLable">phoenix</span>
        </div>
      ),
    },
    {
      value: "raze.png",
      label: (
        <div className="selectContainer">
          <img src={raze} alt="" className="avatarImg" />{" "}
          <span className="imgLable">raze</span>
        </div>
      ),
    },
    {
      value: "reyna.png",
      label: (
        <div className="selectContainer">
          <img src={reyna} alt="" className="avatarImg" />{" "}
          <span className="imgLable">reyna</span>
        </div>
      ),
    },
    {
      value: "sage.png",
      label: (
        <div className="selectContainer">
          <img src={sage} alt="" className="avatarImg" />{" "}
          <span className="imgLable">sage</span>
        </div>
      ),
    },
    {
      value: "skye.png",
      label: (
        <div className="selectContainer">
          <img src={skye} alt="" className="avatarImg" />{" "}
          <span className="imgLable">skye</span>
        </div>
      ),
    },
    {
      value: "sova.png",
      label: (
        <div className="selectContainer">
          <img src={sova} alt="" className="avatarImg" />{" "}
          <span className="imgLable">sova</span>
        </div>
      ),
    },
    {
      value: "viper.png",
      label: (
        <div className="selectContainer">
          <img src={viper} alt="" className="avatarImg" />{" "}
          <span className="imgLable">viper</span>
        </div>
      ),
    },
    {
      value: "yoru.png",
      label: (
        <div className="selectContainer">
          <img src={yoru} alt="" className="avatarImg" />{" "}
          <span className="imgLable">yoru</span>
        </div>
      ),
    },
  ];
};

export const chooseAvatar = (avatar, setAvatar, login) => {
  if (login === "kuzya jidkiy") {
    setAvatar(kuzya);
  } else if (login === "drakyla") {
    setAvatar(drakyla);
  } else {
    switch (avatar) {
      case "astra.png":
        setAvatar(astra);
        break;
      case "breach.png":
        setAvatar(breach);
        break;
      case "brimstone.png":
        setAvatar(brimstone);
        break;
      case "cypher.png":
        setAvatar(cypher);
        break;
      case "jett.png":
        setAvatar(jett);
        break;
      case "kayo.png":
        setAvatar(kayo);
        break;
      case "killjoy.png":
        setAvatar(killjoy);
        break;
      case "omen.png":
        setAvatar(omen);
        break;
      case "phoenix.png":
        setAvatar(phoenix);
        break;
      case "raze.png":
        setAvatar(raze);
        break;
      case "reyna.png":
        setAvatar(reyna);
        break;
      case "sage.png":
        setAvatar(sage);
        break;
      case "skye.png":
        setAvatar(skye);
        break;
      case "sova.png":
        setAvatar(sova);
        break;
      case "viper.png":
        setAvatar(viper);
        break;
      case "yoru.png":
        setAvatar(yoru);
        break;
      default:
        setAvatar(defaultAvatar);
        break;
    }
  }
};
