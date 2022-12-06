const { Router } = require("express");
const bcrypt = require("bcryptjs");
const Room = require("../models/Room");
const router = Router();

// /api/room/create
router.post("/create", async (req, res) => {
  try {
    const { name, password } = req.body;

    const candidate = await new Room(name).isExist();

    if (candidate) {
      return res.status(400).json({ message: "Room already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const room = new Room(name, hashedPassword);
    await room.save();

    res.status(201).json({ message: "Room created" });
  } catch (e) {
    //   res.status(500).json({ message: "Something went wrong, try again" });
    console.log(e);
    res.status(500).json({ message: e });
  }
});

// /api/room/join
router.post("/join", async (req, res) => {
  try {
    const { name, password, id } = req.body;

    const room = await new Room().findOne(name);

    if (!room) {
      return res.status(400).json({ message: "Room not found" });
    }

    if (room.status === "active") {
      return res.status(400).json({ message: "This game has already started" });
    }

    const isMatch = await bcrypt.compare(password, room.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password, try again" });
    }

    if (room.player1 === "") {
      room.player1 = id;
    } else if (room.player2 === "") {
      room.player2 = id;
      room.status = "active";
    } else {
      return res.status(400).json({ message: "This game has already started" });
    }

    room.save();
    res.json({ message: "ok", room: { id: room.id, name: room.name } });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong, try again" });
  }
});

module.exports = router;
