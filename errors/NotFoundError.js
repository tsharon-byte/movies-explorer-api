const { NOT_FOUND_ERROR } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message = NOT_FOUND_ERROR) {
    super(message);
    this.statusCode = 404;
  }
}
module.exports = NotFoundError;
