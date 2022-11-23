const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_KEY } = require('../utils/config');
const NotFoundError = require('../errors/NotFoundError');
const checkError = require('../utils/checkError');

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, name, password: hash })
      .then((data) => {
        res.status(201).send({ email: data.email, _id: data._id, name: data.name });
      }))
    .catch((err) => checkError(err, next));
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;
  const JWT = NODE_ENV === 'production' ? JWT_SECRET : JWT_KEY;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return res.status(500).send({ message: 'Неправильный логин или пароль' });
      }
      return bcrypt.compare(password, user.password)
        .then((result) => {
          if (!result) {
            return res.status(500).send({ message: 'Неправильный логин или пароль' });
          }
          const token = jwt.sign(
            { _id: user._id },
            JWT,
            { expiresIn: '7d' },
          );
          return res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          }).status(200).send({ message: 'Logged in' });
        });
    }).catch((err) => checkError(err, next));
};
const clearCookie = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
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
  const { name } = req.body;
  const { user } = req;
  User.findByIdAndUpdate(user._id, { name }, { new: true, runValidators: true })
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
