const express = require("express");
const router = express.Router();
const hospitals = require("../models/hospitals");

router.get("/hospitals", (req, res) => {
  hospitals.find().then((hos) => res.json(hos));
});

router.get("/hospitals/:id", (req, res) => {
  hospitals
    .findOne({ _id: req.params.id })
    .then((hospital) => res.json(hospital));
});

router.get("/hospital/search", (req, res) => {
  const search = Object.keys(req.query)[0];
  if (req.query[search].length === 0) {
    try {
      hospitals.find().then((hos) => {
        res.json(hos);
      });
    } catch (err) {
      res.send(
        `We have error: ${err.stack}. Sorry. We appreciate your patience while we work this out.`
      );
    }
  } else {
    try {
      hospitals
        .find({ [search]: { $regex: req.query[search], $options: "i" } })
        .then((hos) => {
          res.json(hos);
        });
    } catch (err) {
      res.send(
        `We have error: ${err.stack}. Sorry. We appreciate your patience while we work this out.`
      );
    }
  }
});

module.exports = router;
