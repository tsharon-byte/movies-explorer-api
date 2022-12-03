const express = require('express');
const { clearCookie } = require('../controllers/userController');

const signoutRoute = express.Router();
signoutRoute.post('/signout', clearCookie);
module.exports = signoutRoute;
