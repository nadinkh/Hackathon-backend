const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../models/users');

router.post('/login', (req, res) => {
  users.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: 'invalid credentials' });
        jwt.sign(
          {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: user.type,
            appointments: user.appointments,
            cell: user.cell,
            bloodType: user.bloodType,
            previousDonor: user.previousDonor,
            healthInsurance: user.healthInsurance,
            IDNumber: user.IDNumber,
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
      res.status(400).json({ msg: 'user not found' });
    }
  });
});

module.exports = router;
