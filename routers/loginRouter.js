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
        jwt.sign(
          { id: user.id },
          process.env.TOKEN,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                bloodType: user.bloodType,
                previousDonor: user.previousDonor,
                healthInsurance: user.healthInsurance,
                IDNumber: user.IDNumber,
                type: user.type,
                appointments: user.appointments,
              },
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
