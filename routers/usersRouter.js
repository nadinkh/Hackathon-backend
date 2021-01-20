const express = require('express');
const router = express.Router();
const users = require('../models/users');

router.get('/users', (req, res) => {
  users.find().then((users) => res.json(users));
});

router.get('/:id', (req, res) => {
  users.findOne({ _id: req.params.id }).then((user) => res.json(user));
});

module.exports = router;
