const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUser, updateUser,
} = require('../controllers/userController');

const userRoute = express.Router();
userRoute.get(
  '/me',
  getUser,
);
userRoute.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  updateUser,
);
module.exports = userRoute;
