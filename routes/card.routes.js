const express = require("express");
const router = express.Router();

const Card = require("../models/Card");

// api/card
router.post("/", async (req, res) => {
  try {
    const cards = await Card.getAll();
    res.json(cards);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
