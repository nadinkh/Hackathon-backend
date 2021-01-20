const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/users");

router.post("/", (req, res) => {
  users.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "invalid credentials" });
        jwt.sign({ id: user.id }, process.env.TOKEN, (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        });
      });
    } else {
      res.status(400).json({ msg: "user not found" });
    }
  });
});

module.exports = router;
