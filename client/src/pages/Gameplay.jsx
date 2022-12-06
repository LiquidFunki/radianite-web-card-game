import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

import { CardList } from "../components/CardList";
import { CardPopup } from "../components/CardPopup";
import { Loader } from "../components/Loader";
import { Table } from "../components/Table";
import { BattleProfile } from "../components/BattleProfile";
import { InfoBlock } from "../components/InfoBlock";
import { GiveUp } from "../components/GiveUp";
import { Result } from "../components/Result";
import { Counting } from "../components/Counting";
import { Deck } from "../components/Deck";

import { AuthContext } from "../contexts/AuthContext";
import { BattleContext } from "../contexts/BattleContext";

import { useMessage } from "../hooks/message.hook";
import { useBattle } from "../hooks/battle.hook";
import { useBattleProfile } from "../hooks/battleProfile.hook";

import Game from "../Game/Game";
import Player from "../Game/Player";

const socket = io("http://localhost:5000");

function noop() {}

export const Gameplay = () => {
  const { userId } = useContext(AuthContext);

  const [popupCard, setPopupCard] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState();
  const [resaltActive, setResaltActive] = useState(false);
  const [countingActive, setCountingActive] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [turn, setTurn] = useState(false);
  const [timer, setTimer] = useState("00:10");
  const history = useNavigate();
  const message = useMessage();

  const battleInfo = useBattleProfile();
  const state = useBattle();
  state.socket = socket;

  const room = useParams().id;

  const changeTurn = () => {
    setTimer("00:00");
    socket.emit("changeTurn");
  };

  useEffect(() => {
    message(error);
    setError(null);
  }, [error, message]);

  useEffect(() => {
    socket.emit("initGame", { room, userId });
  }, [room, userId]);

  useEffect(() => {
    socket.on("waiting", (data) => {
      setWaiting(true);
    });

    socket.on("error", (data) => {
      setError(data);
    });

    socket.on("startGame", (data) => {
      const player = new Player(data.player);
      const opponent = new Player(data.opponent);
      new Game(player, socket, opponent, {
        ...state,
        ...battleInfo,
      });
      setTurn(data.turn);
      setWaiting(false);
    });

    socket.on("startCounting", (data) => {
      //TODO: HERE DISPLAY SECRET CARD
      setCountingActive(true);
    });

    socket.on("endCounting", (data) => {
      setCountingActive(false);
    });

    socket.on("changeTurn", (data) => {
      setTurn(data.turn);
    });
    socket.on("timerEnd", (data) => {
      socket.emit("changeTurn");
    });

    socket.on("timer", (data) => {
      setTimer(data.timer);
    });

    socket.on("gameOver", (data) => {
      setResult(data.result);
      setResaltActive(true);
      setTimeout(() => {
        setResaltActive(false);
        history("/battle");
      }, 3000);
    });
  }, [state, battleInfo, history, message, error]);

  if (waiting) {
    return <Loader info={"Waiting for the opponent..."} />;
  }

  return (
    <BattleContext.Provider value={state}>
      <div className="row">
        <div className="col s3">
          {!resaltActive && <GiveUp socket={socket} />}
        </div>
        <div className="col s6">
          <CardList
            classes={["CardList"]}
            side="Opponent"
            cards={state.oppCards}
            setPopupCard={noop}
          />
        </div>
        <div className="col s3">
          <BattleProfile
            Avatar={battleInfo.opponentAvatar}
            HP={battleInfo.opponentHitPoints}
            RP={battleInfo.opponentRadianitePoints}
            Login={battleInfo.opponentLogin}
          />
        </div>

        {popupCard && <CardPopup popupCard={popupCard} />}
        <div className="col s6 offset-s3">
          <Table setPopupCard={setPopupCard} />
        </div>
        <div className="col s3">
          <InfoBlock
            oppTimer="00:10"
            userTimer={timer}
            action={changeTurn}
            turn={turn}
          />
        </div>
        <div className="col s3">
          <Deck />
        </div>
        <div className="col s6">
          <CardList
            classes={turn ? ["CardList"] : ["CardList", "disabledTurn"]}
            side="User"
            cards={state.userCards}
            setPopupCard={setPopupCard}
          />
        </div>
        <div className="col s3">
          <BattleProfile
            Avatar={battleInfo.userAvatar}
            HP={battleInfo.userHitPoints}
            RP={battleInfo.userRadianitePoints}
            Login={battleInfo.userLogin}
          />
        </div>
      </div>
      <Result active={resaltActive} status={result} />
      <Counting
        active={countingActive}
        oppTCards={state.tableOppCards}
        userTCards={state.tableUserCards}
      />
      {/* </div> */}
    </BattleContext.Provider>
  );
};
