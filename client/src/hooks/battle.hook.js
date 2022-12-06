import { useState } from "react";

export const useBattle = () => {
  const [userCards, setUserCards] = useState([]);
  const [oppCards, setOppCards] = useState([]);
  const [tableUserCards, setTableUserCards] = useState([]);
  const [tableOppCards, setTableOppCards] = useState([]);


  return {
    userCards,
    setUserCards,
    oppCards,
    setOppCards,
    tableUserCards,
    setTableUserCards,
    tableOppCards,
    setTableOppCards,
  };
};
