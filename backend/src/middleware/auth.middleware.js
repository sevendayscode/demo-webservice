'use strict';
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
  let token = req.get('Authorization');
  try {
    if (token !== undefined) {
      const splitToken = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(splitToken, process.env.JWT_KEY);
      req.userInfo = decoded;
      next();
    } else {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};

module.exports = {
    checkAuth
}