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
          req.currentUser = decodedToken;
          next();
        }
      }
    );
  } else {
    res.status(400).send('Cannot find user');
  }
};

const staffAuth = (req, res, next) => {
  req.headers;
  if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization,
      process.env.TOKEN,
      (err, decodedToken) => {
        if (err) {
          res.status(400).send('Cannot find user');
        } else {
          if (decodedToken.type === 'staff') {
            req.currentUser = decodedToken;
            next();
          } else {
            res.status(400).send('Cannot find user');
          }
        }
      }
    );
  } else {
    res.status(400).send('Cannot find user');
  }
};

module.exports = { donorsAuth, staffAuth };
