const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/users");

router.post("/login", (req, res) => {
  users.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "invalid credentials" });
        jwt.sign(
          {
            id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            type: newUser.type,
            appointments: newUser.appointments,
            cell: newUser.cell,
            bloodType: newUser.bloodType,
            previousDonor: newUser.previousDonor,
            healthInsurance: newUser.healthInsurance,
            IDNumber: newUser.IDNumber,
          },
          process.env.TOKEN,
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
            });
          }
        );
      });
    } else {
      res.status(400).json({ msg: "user not found" });
    }
  });
});

module.exports = router;
