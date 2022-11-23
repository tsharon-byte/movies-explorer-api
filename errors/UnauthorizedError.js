const { UNAUTHORIZED_ERROR } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message = UNAUTHORIZED_ERROR) {
    super(message);
    this.statusCode = 401;
  }
}
module.exports = UnauthorizedError;
