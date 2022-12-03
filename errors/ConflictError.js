const { CONFLICT_ERROR } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message = CONFLICT_ERROR) {
    super(message);
    this.statusCode = 409;
  }
}
module.exports = ConflictError;
