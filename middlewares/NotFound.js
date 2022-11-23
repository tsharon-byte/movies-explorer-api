const NotFoundError = require('../errors/NotFoundError');
const { PAGE_NOT_FOUND_ERROR } = require('../utils/constants');

const notFound = (req, res, next) => next(new NotFoundError(PAGE_NOT_FOUND_ERROR));
module.exports = notFound;
