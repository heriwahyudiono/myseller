// middleware/authenticationMiddleware.js
const jwt = require('jsonwebtoken');
const responseUtils = require('../utils/responseUtils');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return responseUtils.sendError(res, 401, 'Token tidak ditemukan');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return responseUtils.sendError(res, 403, 'Token tidak valid');
    }

    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
