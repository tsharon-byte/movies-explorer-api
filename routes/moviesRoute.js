const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { getMovie, createMovie, deleteMovie } = require('../controllers/movieController');
const { URL_REGEXP } = require('../utils/constants');

const moviesRoute = express.Router();
moviesRoute.get('/', getMovie);
moviesRoute.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(URL_REGEXP),
      trailerLink: Joi.string().required().pattern(URL_REGEXP),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().pattern(URL_REGEXP),
      movieId: Joi.string().required(),
    }),
  }),
  createMovie,
);
moviesRoute.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  deleteMovie,
);
module.exports = moviesRoute;
