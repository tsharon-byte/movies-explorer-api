const { DEFAULT_MESSAGE_ERROR } = require('../utils/constants');

const errorHandler = (error, req, res, next) => {
  const { statusCode = 500, message } = error;
  const mes = statusCode && message ? message : DEFAULT_MESSAGE_ERROR;
  res.status(statusCode).send({ message: mes });
  return next();
};
module.exports = errorHandler;
