import shirt from "../assets/cards/Shirt.png";
import Astra from "../assets/cards/Astra.png";
import Breach from "../assets/cards/Breach.png";
import Brimstone from "../assets/cards/Brimstone.png";
import Chamber from "../assets/cards/Chamber.png";
import Cypher from "../assets/cards/Cypher.png";
import Fade from "../assets/cards/Fade.png";
import Jett from "../assets/cards/Jett.png";
import Kayo from "../assets/cards/Kayo.png";
import Killjoy from "../assets/cards/Killjoy.png";
import Neon from "../assets/cards/Neon.png";
import Omen from "../assets/cards/Omen.png";
import Phoenix from "../assets/cards/Phoenix.png";
import Raze from "../assets/cards/Raze.png";
import Reyna from "../assets/cards/Reyna.png";
import Sage from "../assets/cards/Sage.png";
import Sova from "../assets/cards/Sova.png";
import Viper from "../assets/cards/Viper.png";
import Yoru from "../assets/cards/Yoru.png";

import ReynaHeal from "../assets/cards/ReynaHeal.png";
import SageHeal from "../assets/cards/SageHeal.png";
import SkyeHeal from "../assets/cards/SkyeHeal.png";
import PhoenixHeal from "../assets/cards/PhoenixHeal.png";

import BrimSmoke from "../assets/cards/BrimSmoke.png";
import JettSmoke from "../assets/cards/JettSmoke.png";
import ViperSmoke from "../assets/cards/ViperSmoke.png";
import OmenSmoke from "../assets/cards/OmenSmoke.png";

import BreachFlash from "../assets/cards/BreachFlash.png";
import KayoFlash from "../assets/cards/KayoFlash.png";
import PhoenixFlash from "../assets/cards/PhoenixFlash.png";
import SkyeFlash from "../assets/cards/SkyeFlash.png";
import YoruFlash from "../assets/cards/YoruFlash.png";
import ReynaFlash from "../assets/cards/ReynaFlash.png";

import CypherUltimate from "../assets/cards/CypherUltimate.png";
import KayoUltimate from "../assets/cards/KayoUltimate.png";
import PhoenixUltimate from "../assets/cards/PhoenixUltimate.png";
import ReynaUltimate from "../assets/cards/ReynaUltimate.png";
import RazeUltimate from "../assets/cards/RazeUltimate.png";

export const chooseCard = (card, setDisplayName) => {
  switch (card?.name) {
    case "Astra.png":
      setDisplayName(Astra);
      break;
    case "Breach.png":
      setDisplayName(Breach);
      break;
    case "Brimstone.png":
      setDisplayName(Brimstone);
      break;
    case "Chamber.png":
      setDisplayName(Chamber);
      break;
    case "Cypher.png":
      setDisplayName(Cypher);
      break;
    case "Fade.png":
      setDisplayName(Fade);
      break;
    case "Jett.png":
      setDisplayName(Jett);
      break;
    case "Kayo.png":
      setDisplayName(Kayo);
      break;
    case "Killjoy.png":
      setDisplayName(Killjoy);
      break;
    case "Neon.png":
      setDisplayName(Neon);
      break;
    case "Omen.png":
      setDisplayName(Omen);
      break;
    case "Phoenix.png":
      setDisplayName(Phoenix);
      break;
    case "Raze.png":
      setDisplayName(Raze);
      break;
    case "Reyna.png":
      setDisplayName(Reyna);
      break;
    case "Sage.png":
      setDisplayName(Sage);
      break;
    case "Sova.png":
      setDisplayName(Sova);
      break;
    case "Viper.png":
      setDisplayName(Viper);
      break;
    case "Yoru.png":
      setDisplayName(Yoru);
      break;
    case "ReynaHeal.png":
      setDisplayName(ReynaHeal);
      break;
    case "SageHeal.png":
      setDisplayName(SageHeal);
      break;
    case "SkyeHeal.png":
      setDisplayName(SkyeHeal);
      break;
    case "PhoenixHeal.png":
      setDisplayName(PhoenixHeal);
      break;
    case "BrimSmoke.png":
      setDisplayName(BrimSmoke);
      break;
    case "JettSmoke.png":
      setDisplayName(JettSmoke);
      break;
    case "ViperSmoke.png":
      setDisplayName(ViperSmoke);
      break;
    case "OmenSmoke.png":
      setDisplayName(OmenSmoke);
      break;
    case "BreachFlash.png":
      setDisplayName(BreachFlash);
      break;
    case "KayoFlash.png":
      setDisplayName(KayoFlash);
      break;
    case "PhoenixFlash.png":
      setDisplayName(PhoenixFlash);
      break;
    case "SkyeFlash.png":
      setDisplayName(SkyeFlash);
      break;
    case "YoruFlash.png":
      setDisplayName(YoruFlash);
      break;
    case "ReynaFlash.png":
      setDisplayName(ReynaFlash);
      break;
    case "CypherUltimate.png":
      setDisplayName(CypherUltimate);
      break;
    case "KayoUltimate.png":
      setDisplayName(KayoUltimate);
      break;
    case "PhoenixUltimate.png":
      setDisplayName(PhoenixUltimate);
      break;
    case "ReynaUltimate.png":
      setDisplayName(ReynaUltimate);
      break;
    case "RazeUltimate.png":
      setDisplayName(RazeUltimate);
      break;
    default:
      setDisplayName(shirt);
      break;
  }
};
