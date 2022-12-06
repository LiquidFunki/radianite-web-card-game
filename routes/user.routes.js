const { Router } = require("express");
const User = require("../models/User");
const router = Router();

router.post("/", async (req, res) => {
  const { id } = req.body;
  const user = await new User().findBy("id", id);
  if (user) {
    res.json(user);
  } else {
    return res.status(400).json({
      message: "something went wrong",
    });
  }
});

router.post("/update", async (req, res) => {
  const { id } = req.body;
  const user = await new User().findBy("id", id);
  if (user) {
    const { description, avatar } = req.body;
    user.avatar = avatar;
    user.description = description;
    await user.save();
    res.json(user);
  } else {
    return res.status(400).json({
      message: "something went wrong",
    });
  }
});

module.exports = router;
