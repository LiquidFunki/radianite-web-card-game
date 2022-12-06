import { useState } from "react";

export const useBattleProfile = () => {
  const [userRadianitePoints, setUserRadianitePoints] = useState(0);
  const [userHitPoints, setUserHitPoints] = useState(0);
  const [opponentRadianitePoints, setOpponentRadianitePoints] = useState(0);
  const [opponentHitPoints, setOpponentHitPoints] = useState(0);
  const [userAvatar, setUserAvatar] = useState("");
  const [opponentAvatar, setOpponentAvatar] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [opponentLogin, setOpponentLogin] = useState("");

  return {
    userRadianitePoints,
    setUserRadianitePoints,
    userHitPoints,
    setUserHitPoints,
    opponentRadianitePoints,
    setOpponentRadianitePoints,
    opponentHitPoints,
    setOpponentHitPoints,
    userAvatar,
    setUserAvatar,
    opponentAvatar,
    setOpponentAvatar,
    userLogin,
    setUserLogin,
    opponentLogin,
    setOpponentLogin,
  };
};
