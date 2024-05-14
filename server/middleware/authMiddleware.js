const jwt = require("jsonwebtoken");
const db = require('../models');

const requireAuth = function (req, res, next) {
    const token = req.cookies.jwt;
  
    // check if jwt exists & verified
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET_TOKEN,
        function (err, decodedToken) {
          if (err) {
            console.log(err.message);
            res.status(401).json({ error: 'Unauthorized' });
          } else {
            console.log(decodedToken);
            next();
          }
        }
      );
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

const checkUser = function (req, res, next) {
    const token = req.cookies.jwt;
  
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET_TOKEN,
        async function (err, decodedToken) {
          if (err) {
            console.log(err.message);
            req.user = null;
            next();
          } else {
            console.log(decodedToken);
            let user = await db.User.findOne({where: {id: decodedToken.id}});
            req.user = user;
            next();
          }
        }
      );
    } else {
      req.user = null;
      next();
    }
};

module.exports = { requireAuth, checkUser };
  