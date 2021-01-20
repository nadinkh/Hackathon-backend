const jwt = require('jsonwebtoken');

const donorsAuth = (req, res, next) => {
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.TOKEN,
      (err, decodedToken) => {
        if (err) {
          res.status(400).send('Cannot find user');
        } else {
          next();
        }
      }
    );
  } else {
    res.status(400).send('Cannot find user');
  }
};

const staffAuth = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.type === 'staff') {
    jwt.verify(
      req.headers.authorization,
      process.env.TOKEN,
      (err, decodedToken) => {
        if (err) {
          res.status(400).send('Cannot find user');
        } else {
          next();
        }
      }
    );
  } else {
    res.status(400).send('Cannot find user');
  }
};

module.exports = { donorsAuth, staffAuth };
