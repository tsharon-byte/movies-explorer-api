const { INCORRECT_DATA_ERROR } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message = INCORRECT_DATA_ERROR) {
    super(message);
    this.statusCode = 400;
  }
}
module.exports = BadRequestError;
