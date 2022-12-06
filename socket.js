const User = require("./models/User");
const Game = require("./Game/Game");
const Player = require("./Game/Player");

var waitingPlayers = [];

async function addWaitingPlayers(userId, socket, room) {
  const user = await new User().findBy("id", userId);
  if (user) {
    const member = {
      login: user.login,
      avatar: user.avatar,
      socket: socket,
      room: room,
    };
    waitingPlayers.push(member); //TODO: Add disconnect
    return member;
  }
}

function checkPair(data){
  let result = null;
  waitingPlayers.forEach(member => {
    if(member.room === data.room && member.login !== data.login){
      const p1 = new Player(member.login, member.socket, member.room, member.avatar)
      const p2 = new Player(data.login, data.socket, data.room, data.avatar)
      result = new Game(p1, p2);
    }
  })
  return result;
}

module.exports = (socket) => { 
  console.log(`Socket with id: ${socket.id} --- Connected `);

  socket.on("initGame", async (data) => {
    socket.join(data.room);
    const member = await addWaitingPlayers(data.userId, socket, data.room);
    const game = checkPair(member);
    if(!game){
      socket.to(data.room).emit('waiting');
    }
  });

  socket.on("disconnect", () => {
    //TODO: NEED REMAKE & DEVELOPE
    waitingPlayers = waitingPlayers.filter((data) => data.socket.id !== socket.id);
    console.log(`Socket with id: ${socket.id} --- Disconnected`);
  });
};
