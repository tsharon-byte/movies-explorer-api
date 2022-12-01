const express = require('express');
const registrationRoute = require('./registrationRoute');
const auth = require('../middlewares/auth');
const userRoute = require('./userRoute');
const moviesRoute = require('./moviesRoute');
const notFound = require('../middlewares/NotFound');
const signoutRoute = require('./signoutRoute');

const routes = express();
routes.use('/', registrationRoute);
routes.use(auth);
routes.use('/', signoutRoute);
routes.use('/users', userRoute);
routes.use('/movies', moviesRoute);
routes.use(notFound);
module.exports = routes;
