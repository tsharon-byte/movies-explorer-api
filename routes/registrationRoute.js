const express = require('express');
const { createUser, login } = require('../controllers/userController');
const { createUserValidation, loginValidation } = require('../validation/validation');

const registrationRoute = express.Router();
registrationRoute.post(
  '/signup',
  createUserValidation,
  createUser,
);
registrationRoute.post(
  '/signin',
  loginValidation,
  login,
);
module.exports = registrationRoute;
