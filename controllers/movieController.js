const Movie = require('../models/movie');
const checkError = require('../utils/checkError');
const { DELETION_FORBIDDEN_ERROR, DELETED } = require('../utils/constants');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovie = (req, res, next) => {
  const { user } = req;
  Movie.find({ owner: user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => checkError(err, next));
};
const createMovie = (req, res, next) => {
  Movie.create({ ...req.body, owner: req.user._id })
    .then((doc) => res.status(201).send(doc))
    .catch((err) => checkError(err, next));
};
const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  Movie.findOne({ _id: id })
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError());
      }
      if (JSON.stringify(movie.owner._id) !== JSON.stringify(user._id)) {
        return next(new ForbiddenError(DELETION_FORBIDDEN_ERROR));
      }
      return Movie.findByIdAndRemove(id)
        .then(() => res.send({ movie, message: DELETED }));
    })
    .catch((err) => checkError(err, next));
};
module.exports = { getMovie, createMovie, deleteMovie };
