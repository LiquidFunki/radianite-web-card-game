import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";

import { Loader } from "../components/Loader";
import { MyCard } from "../components/UI/MyCard";

import "../styles/Rules.css";

export const Rules = () => {
  const [cards, setCards] = useState([]);

  const { loading, request } = useHttp();

  const fetchData = useCallback(async () => {
    let data = await request("/api/card", "POST");
    const uniqueArray = data.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    );
    uniqueArray.forEach((card) => {
      card.status = "public";
    });
    setCards(uniqueArray);
  }, [request]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loader info={"Loading cards..."} />;
  }

  return (
    <div className="row Rules Animation">
      <div className="col s4">
        <h1 className="row RulesText">Rules:</h1>
        <div className="RulesContainer">
          <p className="rulesText">
            From the start, you and your opponent each have{" "}
            <span className="numSpan">30</span>{" "}
            <span className="redSpan">hp</span> and{" "}
            <span className="numSpan">1</span>{" "}
            <span className="redSpan">rp</span>, with each subsequent move, the
            amount of <span className="redSpan">rp</span> increases by{" "}
            <span className="numSpan">2</span>.
          </p>
          <p className="rulesText">
            Max <span className="redSpan">hp</span> can go up to{" "}
            <span className="numSpan">50</span> and{" "}
            <span className="redSpan">rp</span> up to{" "}
            <span className="numSpan">9</span>.
          </p>
          <p className="rulesText">
            The maximum number of cards in a hand is{" "}
            <span className="numSpan">8</span>.
          </p>
          <p className="rulesText">
            There are <span className="numSpan">46</span> cards in the deck in
            total.
          </p>
          <p className="rulesText">
            There are <span className="numSpan">6</span> types of cards:
          </p>
          <p className="rulesText">
            • <span className="redSpan">A</span> - attack cards. Deals{" "}
            <span className="numSpan">
              <em>N</em>&nbsp;
            </span>{" "}
            damage to the opponent.
          </p>
          <p className="rulesText">
            • <span className="redSpan">D</span> - defense cards. Provides
            protection against{" "}
            <span className="numSpan">
              <em>N</em>&nbsp;
            </span>
            &nbsp; damage.
          </p>
          <p className="rulesText">
            • <span className="redSpan">H</span> - spell cards. Heals player in
            amount of{" "}
            <span className="numSpan">
              <em>N</em>&nbsp;
            </span>{" "}
            <span className="redSpan">hp</span>.
          </p>
          <p className="rulesText">
            • <span className="redSpan">S</span> - spell cards. With chance of{" "}
            <span className="numSpan">
              <em>N%</em>&nbsp;
            </span>{" "}
            all damage will be ignored.
          </p>
          <p className="rulesText">
            • <span className="redSpan">S</span> - spell cards.{" "}
            <span className="numSpan">
              <em>N%</em>&nbsp;
            </span>{" "}
            of damage will be returned to opponent with{" "}
            <span className="numSpan">
              <em>M%</em>&nbsp;
            </span>{" "}
            chance.
          </p>
          <p className="rulesText">
            • <span className="redSpan">U</span> - spell cards. Uses the
            character's ultimate.
          </p>
          <p className="rulesText">
            More information about the maps can be seen on the map itself.
          </p>
          <p className="rulesText">
            The one who runs out of <span className="redSpan">hp</span> or cards
            in the deck will lose.
          </p>
          <p className="rulesText">
            <span className="numSpan">Good luck! </span>
          </p>
        </div>
      </div>
      <div className="col s8">
        <h1 className="row RulesText">All cards:</h1>
        <div className="CardContainer">
          {cards.map((data, index) => (
            <div key={index} className="CardImgContainer">
              <MyCard card={data} classes={["RulesCard"]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
