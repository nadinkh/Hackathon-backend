const express = require('express');
const router = new express.Router();

router.get('/', (req, res) => {
  res.send('test me baby one more time!');
});

module.exports = router;
