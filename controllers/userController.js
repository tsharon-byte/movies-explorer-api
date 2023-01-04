const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_KEY } = require('../utils/config');
const NotFoundError = require('../errors/NotFoundError');
const checkError = require('../utils/checkError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { INCORRECT_LOGIN_OR_PASSWORD_ERROR, LOGOUT } = require('../utils/constants');

const prepareToken = (user) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const JWT = NODE_ENV === 'production' ? JWT_SECRET : JWT_KEY;
  return jwt.sign(
    { _id: user._id },
    JWT,
    { expiresIn: '7d' },
  );
};

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash })
      .then((data) => {
        const token = prepareToken(data);
        res.cookie('jwt', token, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        }).status(201).send({ email: data.email, _id: data._id, name: data.name });
      }))
    .catch((err) => checkError(err, next));
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError(INCORRECT_LOGIN_OR_PASSWORD_ERROR));
      }
      return bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) {
            return next(new UnauthorizedError(INCORRECT_LOGIN_OR_PASSWORD_ERROR));
          }
          const token = prepareToken(user);
          return res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          }).status(200).send({ name: user.name, email: user.email });
        });
    }).catch((err) => checkError(err, next));
};
const clearCookie = (req, res) => {
  res.clearCookie('jwt', {
    sameSite: 'none',
    secure: true,
  }).send({ message: LOGOUT });
};
const getUser = (req, res, next) => {
  const { user } = req;
  User.findById(user._id)
    .select('email name')
    .then((doc) => {
      if (!doc) {
        return next(new NotFoundError());
      }
      return res.send(doc);
    })
    .catch((err) => checkError(err, next));
};
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;
  User.findByIdAndUpdate(user._id, { name, email }, { new: true, runValidators: true })
    .select('email name')
    .then((doc) => {
      if (!doc) {
        return next(new NotFoundError());
      }
      return res.send(doc);
    })
    .catch((err) => checkError(err, next));
};
module.exports = {
  getUser, updateUser, createUser, login, clearCookie,
};
