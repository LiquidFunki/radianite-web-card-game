import { createContext } from "react";

const noop = () => {};

export const BattleContext = createContext({
  userCards: [],
  setUserCards: noop,
  oppCards: [],
  setOppCards: noop,
  tableUserCards: [],
  setTableUserCards: noop,
  tableOppCards: [],
  setTableOppCards: noop,
  socket: null,
});
