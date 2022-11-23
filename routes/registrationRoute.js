const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { createUser, login, clearCookie } = require('../controllers/userController');

const registrationRoute = express.Router();
registrationRoute.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  createUser,
);
registrationRoute.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);
registrationRoute.post('/signout', clearCookie);
module.exports = registrationRoute;
