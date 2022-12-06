const Player = require("./Player");
const Card = require("../models/Card");
const Room = require("../models/Room");
const User = require("../models/User");

module.exports = class Game {
  /**
   *
   * @param {Player} p1
   * @param {Player} p2
   */
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.players = [p1, p2];
    this.#gameInit();
    this.#addEventListener();
    this.timeOutId = null;
    this.turnCheck = 1;
  }

  async #gameInit() {
    try {
      const cards = await Card.getAll();
      this.p1.deck = cards;
      this.p2.deck = cards;
    } catch (error) {
      console.error(error);
    }

    // Between 1 and max(2)
    let resTurn = Math.floor(Math.random() * 2) + 1;
    if (resTurn == 1) {
      this.p1.turn = true;
      this.p1.startTimer(59);
      this.p2.stopTimer();
      // this.timeOutId = setTimeout(() => {
      //   this.p1.socket.emit("timerEnd");
      // }, 12000)
    } else {
      this.p2.turn = true;
      this.p2.startTimer(59);
      this.p1.stopTimer();
      // this.timeOutId = setTimeout(() => {
      //   this.p2.socket.emit("timerEnd");
      // }, 12000)
    }

    this.players.forEach((data, index) => {
      const opponent = this.players[(index + 1) % 2];

      data.socket.emit("startGame", {
        player: data.name,
        opponent: opponent.name,
        turn: data.turn,
      });
      data.startHandCards();
    });

    this.players.forEach((data, index) => {
      const opponent = this.players[(index + 1) % 2];
      data.sendData();
      data.socket.emit("opponentInfo", {
        health: opponent.health,
        name: opponent.name,
        handCards: opponent.handCards, // TODO: Change this
        radianite: opponent.radianite,
        avatar: opponent.avatar,
      });
    });
  }

  #addEventListener() {
    this.players.forEach((player, index) => {
      const opponent = this.players[(index + 1) % 2];

      player.socket.on("changeTurn", () => {
        if (this.turnCheck === 2) {
          player.stopTimer();
          player.socket.emit("startCounting");
          opponent.socket.emit("startCounting");

          this.#CountCards();
          this.turnCheck = 1;

          setTimeout(() => {
            // clearTimeout(this.timeOutId);
            player.stopTimer();
            player.socket.emit("endCounting");
            opponent.socket.emit("endCounting");
            this.#updatePlayers();
            opponent.socket.emit("changeTurn", { turn: opponent.turn }); // ???
            player.socket.emit("changeTurn", { turn: player.turn }); // ???
            player.startTimer(59);

            // this.timeOutId = setTimeout( () => {
            //   player.socket.emit("timerEnd");
            //   opponent.stopTimer();
            //   player.stopTimer();
            // }, 11000)
          }, 3000);
        } else {
          clearTimeout(this.timeOutId);
          player.stopTimer();
          opponent.stopTimer();
          player.turn = !player.turn;
          opponent.turn = !opponent.turn;
          opponent.socket.emit("changeTurn", { turn: opponent.turn });
          player.socket.emit("changeTurn", { turn: player.turn });
          opponent.startTimer(59);
          // this.timeOutId = setTimeout(() => {
          //   opponent.socket.emit("timerEnd");
          //   opponent.stopTimer();
          //   player.stopTimer();
          // }, 12000)
          this.turnCheck++;
        }
      });

      player.socket.on("moveCard", (data) => {
        if (player.checkCard(data)) {
          if (data.name === "CypherUltimate.png") {
            opponent.tableCards.forEach((card) => {
              card.status = "public";
            });
            player.socket.emit("updateOpponentTableCards", {
              cards: opponent.tableCards,
            });
          }
          player.changeHandCards(data);
          player.changeTableCards(data);
          // opponent.socket.emit("updateOpponentCards",  { cards: player.handCards })
          player.socket
            .to(player.room)
            .emit("updateOpponentCards", { cards: player.handCards });
          player.socket
            .to(player.room)
            .emit("updateOpponentTableCards", { cards: player.tableCards });
        }
      });

      player.socket.on("GiveUp", async (data) => {
        //TODO: Delete/Clear Socket
        player.socket.emit("gameOver", { result: "lose" });
        opponent.socket.emit("gameOver", { result: "win" });
        this.#updateStatistics(opponent.name, player.name);
        Room.delete(player.room);
      });
    });
  }

  async #updateStatistics(winnerName, loserName) {
    const winner = await new User().findBy("login", winnerName);
    winner.win_counter++;
    await winner.save();
    const loser = await new User().findBy("login", loserName);
    loser.lose_counter++;
    await loser.save();
  }

  #CountCards() {
    let p1DamageCards = this.p1.tableCards.filter(
      (card) => card.type === "damage"
    );
    let p1DefenseCards = this.p1.tableCards.filter(
      (card) => card.type === "defense"
    );
    // let p1HealCards = this.p1.tableCards.filter((card) => card.type === 'heal')
    let p1SmokeCards = this.p1.tableCards.filter(
      (card) => card.type === "smoke"
    );
    let p1FlashCards = this.p1.tableCards.filter(
      (card) => card.type === "flash"
    );
    let p1UltCards = this.p1.tableCards.filter((card) => card.type === "ult");

    let p2DamageCards = this.p2.tableCards.filter(
      (card) => card.type === "damage"
    );
    let p2DefenseCards = this.p2.tableCards.filter(
      (card) => card.type === "defense"
    );
    // let p2HealCards = this.p2.tableCards.filter((card) => card.type === 'heal')
    let p2SmokeCards = this.p2.tableCards.filter(
      (card) => card.type === "smoke"
    );
    let p2FlashCards = this.p2.tableCards.filter(
      (card) => card.type === "flash"
    );
    let p2UltCards = this.p2.tableCards.filter((card) => card.type === "ult");

    let p1DefSum = 0;
    let p1DamSum = 0;
    p1DefenseCards.forEach((card) => {
      p1DefSum += card.power_points;
    });
    p1DamageCards.forEach((card) => {
      p1DamSum += card.power_points;
    });

    let p2DefSum = 0;
    let p2DamSum = 0;

    p1UltCards.forEach((card) => {
      if (card.name === "KayoUltimate.png") {
        //TODO: KAYO ULT CHECKER FOR OTHER PLAYER TABLE CARDS
        p2FlashCards = [];
        p2SmokeCards = [];
        p2UltCards = [];
      }
    });

    p2UltCards.forEach((card) => {
      if (card.name === "KayoUltimate.png") {
        p1FlashCards = [];
        p1SmokeCards = [];
        p1UltCards = [];
      }
    });

    p1UltCards.forEach((card) => {
      if (card.name === "RazeUltimate.png") {
        //Raze Ultimate
        p1DamSum += 20;
      }
    });

    p2UltCards.forEach((card) => {
      if (card.name === "RazeUltimate.png") {
        //Raze Ultimate
        p2DamSum += 20;
      }
    });

    p2DefenseCards.forEach((card) => {
      p2DefSum += card.power_points;
    });
    p2DamageCards.forEach((card) => {
      p2DamSum += card.power_points;
    });

    p1SmokeCards.forEach((card) => {
      let foo = Math.random() * 100;
      if (foo < card.power_points) {
        p2DamSum = 0;
      }
    });

    p2SmokeCards.forEach((card) => {
      let foo = Math.random() * 100;
      if (foo < card.power_points) {
        p1DamSum = 0;
      }
    });

    p1FlashCards.forEach((card) => {
      let foo = Math.random() * 100;
      let plusDamage = card.power_points / 100;
      if (foo < card.flash_chance) {
        p1DamSum += p2DamSum * plusDamage;
      }
    });

    p2FlashCards.forEach((card) => {
      let foo = Math.random() * 100;
      let plusDamage = card.power_points / 100;
      if (foo < card.flash_chance) {
        p2DamSum += p1DamSum * plusDamage;
      }
    });

    p1UltCards.forEach((card) => {
      if (card.name === "ReynaUltimate.png") {
        //Reyna Ultimate
        let reynaHeal = p2DamSum + p2DamSum * 0.15;
        this.p1.changeHealth(reynaHeal, "+");
        p2DamSum = 0;
      } else if (card.name === "PhoenixUltimate.png") {
        p1DamSum += p2DamSum;
        p1DamSum += p2DamSum * 0.15;
      }
    });

    p2UltCards.forEach((card) => {
      if (card.name === "ReynaUltimate.png") {
        //Reyna Ultimate
        let reynaHeal = p1DamSum + p1DamSum * 0.15;
        this.p2.changeHealth(reynaHeal, "+");
        p1DamSum = 0;
      } else if (card.name === "PhoenixUltimate.png") {
        p2DamSum += p1DamSum;
        p2DamSum += p1DamSum * 0.15;
      }
    });

    p1DamSum -= p2DefSum;
    p2DamSum -= p1DefSum;

    p1DamSum > 0 ? this.p2.changeHealth(p1DamSum, "-") : null;
    p2DamSum > 0 ? this.p1.changeHealth(p2DamSum, "-") : null;

    this.players.forEach((player) => {
      let HealCards = player.tableCards.filter((card) => card.type === "heal");
      HealCards.forEach((card) => {
        player.changeHealth(card.power_points, "+");
      });
    });
  }

  #updatePlayers() {
    this.players.forEach((player, index) => {
      player.radianiteUp();
      player.radianiteUp();

      let newCardCount =
        player.handCards.length < 3 ? 3 : player.handCards.length < 5 ? 2 : 1;
      player.takeNewCard(newCardCount);
      player.socket.emit("clearTable");
      player.tableCards = [];
    });

    this.players.forEach((player, index) => {
      const opponent = this.players[(index + 1) % 2];

      player.socket.emit("updateUserHealth", player.health);
      player.socket.emit("updateUserRadianite", player.radianite);
      player.socket.emit("updateUserHandCards", player.handCards);

      player.socket.emit("updateOppHealth", opponent.health);
      player.socket.emit("updateOppRadianite", opponent.radianite);
      player.socket.emit("updateOppHandCards", opponent.handCards);
    });

    this.players.forEach(async (player, index) => {
      const opponent = this.players[(index + 1) % 2];
      if (player.health <= 0 && opponent.health <= 0) {
        player.socket.emit("gameOver", { result: "draw" });
        const winner = await new User().findBy("login", player.name);
        winner.draw_counter++;
        await winner.save();
        Room.delete(player.room);
      } else {
        if (player.health <= 0) {
          player.socket.emit("gameOver", { result: "lose" });
          opponent.socket.emit("gameOver", { result: "win" });
          this.#updateStatistics(opponent.name, player.name);
          Room.delete(player.room);
        }

        if (player.handCards.length == 0) {
          player.socket.emit("gameOver", { result: "lose" });
          opponent.socket.emit("gameOver", { result: "win" });
          this.#updateStatistics(opponent.name, player.name);

          Room.delete(player.room);
        }
      }
    });
  }
};
