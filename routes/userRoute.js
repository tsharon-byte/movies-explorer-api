const express = require('express');
const {
  getUser, updateUser,
} = require('../controllers/userController');
const { updateUserValidation } = require('../validation/validation');

const userRoute = express.Router();
userRoute.get(
  '/me',
  getUser,
);
userRoute.patch(
  '/me',
  updateUserValidation,
  updateUser,
);
module.exports = userRoute;
