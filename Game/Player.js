// import { useMessage } from "../hooks/message.hook";

module.exports = class Player {
  constructor(name, socket, room, avatar, health = 30, radianite = 1) {
    this.name = name;
    this.socket = socket;
    this.room = room;
    this.avatar = avatar;
    this.health = health;
    this.radianite = radianite;
    this.currentRadianite = radianite;
    this.deck = [];
    this.handCards = [];
    this.tableCards = [];
    this.turn = false;
    this.timerId = null;
  }

  sendData() {
    this.socket.emit("playerInfo", {
      health: this.health,
      name: this.name,
      handCards: this.handCards,
      radianite: this.radianite,
      deck: this.deck,
      avatar: this.avatar,
    });
  }

  startTimer(count) {
    // let count = 5;
    this.timerId = setInterval(() => {
      let countText = count < 10 ? `0${count}` : `${count}`;
      if (count <= 0) {
        this.stopTimer();
      }
      if (count >= 0) {
        let timer = `00:${countText}`;
        this.socket.emit("timer", { timer });
        count--;
      }
    }, 1000);
  }

  stopTimer() {
    clearTimeout(this.timerId);
    clearInterval(this.timerId);
  }

  checkCard(data) {
    if (data.price > this.currentRadianite) {
      this.socket.emit("error", "Not enough Radianite points");
      return false;
    } else if (this.tableCards.length >= 5) {
      this.socket.emit("error", "No more than 5 cards can be on the table");
      return false;
    } else {
      this.currentRadianite -= data.price;
      this.socket.emit("updateUserRadianite", this.currentRadianite);
      this.socket
        .to(this.room)
        .emit("updateOppRadianite", this.currentRadianite);
    }
    return true;
  }

  changeHandCards(data) {
    this.handCards = this.handCards.filter((card) => card.id !== data.id);
    this.socket.emit("updateHandCards", { cards: this.handCards });
  }

  changeTableCards(data) {
    this.tableCards.push(data);
    this.socket.emit("updateUserTableCards", { cards: this.tableCards });
  }

  changeHealth(amount, sign) {
    //if heal: sign +; if attack: sign -
    if (sign == "-") {
      this.health -= Math.round(amount);
    } else {
      this.health += Math.round(amount);
      if (this.health > 50) {
        this.health = 50;
      }  
    }
  }

  radianiteUp() {
    if (this.radianite + 1 < 10) {
      this.radianite += 1;
    }
    this.currentRadianite = this.radianite;
  }

  startHandCards() {
    let attackCards = this.deck.filter((data) => data.type == "damage");
    for (let i = 0; i < 3; i++) {
      let attCard = attackCards[Math.floor(Math.random() * attackCards.length)]; //import?

      this.handCards.push(attCard);
      attackCards = attackCards.filter((data) => data.id != attCard.id);
      this.deck = this.deck.filter((data) => data.id != attCard.id);
    }

    let defCards = this.deck.filter((data) => data.type == "defense");
    let defCard = defCards[Math.floor(Math.random() * defCards.length)]; //import?
    this.handCards.push(defCard);
    this.deck = this.deck.filter((data) => data.id != defCard.id);

    for (let i = 0; i < 2; i++) {
      let card = this.deck[Math.floor(Math.random() * this.deck.length)]; //import?
      this.handCards.push(card);
      this.deck = this.deck.filter((data) => data.id != card.id);
    }
    this.socket.emit("getDeckLength", this.deck.length)
  }

  takeNewCard(count) {
    if (count <= this.deck.length) {
      for (let i = 0; i < count && this.handCards.length < 8; i++) {
        let card = this.deck[Math.floor(Math.random() * this.deck.length)]; //import?
        this.handCards.push(card);
        this.deck = this.deck.filter((data) => data.id != card.id);
      }
    } else {
      for (let i = 0; i < this.deck.length; i++) {
        let card = this.deck[Math.floor(Math.random() * this.deck.length)]; //import?
        this.handCards.push(card);
        this.deck = this.deck.filter((data) => data.id != card.id);
      }
    }
    this.socket.emit("getDeckLength", this.deck.length)
  }
};
