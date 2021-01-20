const express = require("express");
const router = new express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Users = require("../models/users");

router.post(
  "/signup",
  [
    check("firstName", "First name is required").trim().not().isEmpty(),
    check("lastName", "Last name is required").trim().not().isEmpty(),
    check("email", "Please includ a valid email").trim().isEmail(),
    check("cell", "Phone number is required").trim().not().isEmpty(),
    check("bloodType", "Blood type is required").trim().not().isEmpty(),
    check("previousDonor", "Provided blood before is required")
      .trim()
      .not()
      .isEmpty(),
    check("healthInsurance", "Health insurance is required")
      .trim()
      .not()
      .isEmpty(),
    check("IDNumber", "ID is required").trim().not().isEmpty(),
    check("password", "Please enter a password with 6 or more characters")
      .trim()
      .isLength({
        min: 6,
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // if there are errors return 400 (bed request);
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      email,
      cell,
      bloodType,
      previousDonor,
      healthInsurance,
      IDNumber,
      password,
    } = req.body;

    try {
      // test if email and username are unique
      const userEmail = await Users.findOne({ email });
      const userIDNumber = await Users.findOne({ IDNumber });

      if (userEmail || userIDNumber) {
        if (userEmail) {
          return res
            .status(400)
            .json({ errors: [{ msg: "Email already registered" }] });
        }

        return res.status(400).json({ errors: [{ msg: "ID alredy exists" }] });
      }

      const passwordBcrypt = await bcrypt.hash(password, 10);

      newUser = new Users({
        firstName,
        lastName,
        email,
        cell,
        bloodType,
        previousDonor,
        healthInsurance,
        IDNumber,
        password: passwordBcrypt,
      });

      await newUser.save();

      const token = jwt.sign(
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
        process.env.TOKEN
      );

      return res.status(200).json({
        token,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
