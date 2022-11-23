const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError());
  }

  const { NODE_ENV, JWT_SECRET } = process.env;
  const JWT = NODE_ENV === 'production' ? JWT_SECRET : JWT_KEY;
  let payload;
  try {
    payload = jwt.verify(token, JWT);
  } catch (err) {
    return next(new UnauthorizedError());
  }
  req.user = payload;
  return next();
};
module.exports = auth;
