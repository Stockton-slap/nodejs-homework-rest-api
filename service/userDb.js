const User = require("../service/schemas/user");

const createUser = (password, body) => {
  return User.create({ password, ...body });
};

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

const addToken = (id, token) => {
  return User.findByIdAndUpdate(id, { token });
};

module.exports = { createUser, findUserByEmail, addToken };
