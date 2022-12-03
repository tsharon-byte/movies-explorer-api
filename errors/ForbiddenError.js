const { FORBIDDEN_ERROR } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message = FORBIDDEN_ERROR) {
    super(message);
    this.statusCode = 403;
  }
}
module.exports = ForbiddenError;
