import Player from "./Player";

export default class Game {
  /**
   *
   * @param {Player} player
   * @param {Player} opponent
   */
  constructor(player, socket, opponent, states) {
    this.player = player;
    this.socket = socket;
    this.opponent = opponent;
    this.states = states;
    // this.field = {
    //   tableUserCards: [],
    //   tableOppCards: [],
    // };
    this.#addEventListener();
  }

  //   userCards,
  //   setUserCards,
  //   oppCards,
  //   setOppCards,
  //   tableUserCards,
  //   setTableUserCards,
  //   tableOppCards,
  //   setTableOppCards,
  //   moveCard,

  // userRadianitePoints,
  // setUserRadianitePoints,
  // userHitPoints,
  // setUserHitPoints,
  // opponentRadianitePoints,
  // setOpponentRadianitePoints,
  // opponentHitPoints,
  // setOpponentHitPoints,
  // userAvatar,
  // setUserAvatar,
  // opponentAvatar,
  // setOpponentAvatar,
  // userLogin,
  // setUserLogin,
  // opponentLogin,
  // setOpponentLogin,

  #addEventListener() {
    this.socket.on("playerInfo", (data) => {
      this.player.health = data.health;
      this.player.handCards = data.handCards;
      this.player.name = data.name;
      this.player.radianite = data.radianite;
      this.player.deck = data.deck;


      this.states.setUserLogin(this.player.name)
      this.states.setUserHitPoints(this.player.health)
      this.states.setUserRadianitePoints(this.player.radianite)
      this.states.setUserAvatar(data.avatar)
      this.states.setUserCards(this.player.handCards);
    });

    this.socket.on("opponentInfo", (data) => {
      this.opponent.health = data.health;
      this.opponent.handCards = data.handCards;
      this.opponent.name = data.name;
      this.opponent.radianite = data.radianite;

      this.states.setOpponentLogin(this.opponent.name)
      this.states.setOpponentHitPoints(this.opponent.health)
      this.states.setOpponentRadianitePoints(this.opponent.radianite)
      this.states.setOpponentAvatar(data.avatar)
      this.states.setOppCards(this.opponent.handCards);
    });

    this.socket.on("updateOpponentCards", (data) => {
      this.states.setOppCards(data.cards);
    });

    this.socket.on("updateHandCards", (data) => {
      this.states.setUserCards(data.cards);
    });

    this.socket.on("updateOpponentTableCards", (data) => {
      this.states.setTableOppCards(data.cards);
    });

    this.socket.on("updateUserTableCards", (data) => {
      this.states.setTableUserCards(data.cards);
    });

    this.socket.on("updateUserHealth", (data) => {
      this.player.health = data;
      this.states.setUserHitPoints(data);
    });

    this.socket.on("updateUserRadianite", (data) => {
      this.player.radianite = data;
      this.states.setUserRadianitePoints(data);
    });

    this.socket.on("updateUserHandCards", (data) => {
      this.player.handCards = data;
      this.states.setUserCards(data);
    });

    this.socket.on("updateOppHealth", (data) => {
      this.player.health = data;
      this.states.setOpponentHitPoints(data);
    });

    this.socket.on("updateOppRadianite", (data) => {
      this.player.radianite = data;
      this.states.setOpponentRadianitePoints(data);
    });

    this.socket.on("updateOppHandCards", (data) => {
      this.player.handCards = data;
      this.states.setOppCards(data);
    });

    this.socket.on("clearTable", () => {
      this.states.setTableUserCards([]);
      this.states.setTableOppCards([]);
    });

  }
}
