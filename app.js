require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/ErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const { MONGO_LOCAL } = require('./utils/config');
const limiter = require('./middlewares/limiter');

const { NODE_ENV, MONGO_DB } = process.env;
const mongoUrl = NODE_ENV === 'production' ? MONGO_DB : MONGO_LOCAL;

const app = express();
mongoose.connect(`${mongoUrl}moviesdb`);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);
app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is listening port:', port);
});
