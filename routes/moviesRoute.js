const express = require('express');
const { getMovie, createMovie, deleteMovie } = require('../controllers/movieController');
const { createMovieValidation, deleteMovieValidation } = require('../validation/validation');

const moviesRoute = express.Router();
moviesRoute.get('/', getMovie);
moviesRoute.post(
  '/',
  createMovieValidation,
  createMovie,
);
moviesRoute.delete(
  '/:id',
  deleteMovieValidation,
  deleteMovie,
);
module.exports = moviesRoute;
