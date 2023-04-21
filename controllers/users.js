const { errorsHandler } = require('../utils/utils');

const { CREATE_CODE } = require('../utils/constants');

const User = require('../models/users');

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => errorsHandler(err, res));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errorsHandler(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(CREATE_CODE).send(user))
    .catch((err) => errorsHandler(err, res));
};

const userUpdate = (req, res, updateData) => {
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => errorsHandler(err, res));
};

module.exports.updateUserInfo = (req, res) => {
  const updateData = req.body;
  userUpdate(req, res, updateData);
};

module.exports.updateUserAvatar = (req, res) => {
  const updateData = req.body;
  userUpdate(req, res, updateData);
};
