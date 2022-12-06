const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post(
  "/register",
  [
    check("login", "Incorrect login").toLowerCase(),
    check("password", "Minimum password length must be at least 6").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login or password",
        });
      }

      const { login, password } = req.body;

      const candidate = await new User(login).isExist(login);

      if (candidate) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User(login, hashedPassword);

      await user.save();

      res.status(201).json({ message: "User created" });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("login", "Input correct login").toLowerCase(),
    check("password", "Input password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login or password",
        });
      }

      const { login, password } = req.body;

      const user = await new User().findBy("login", login);

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Incorrect password, try again" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWTSECRET, {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }
);

module.exports = router;
