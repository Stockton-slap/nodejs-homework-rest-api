const User = require("../service/schemas/user");

const createUser = (password, body, avatar, verificationToken) => {
  return User.create({
    ...body,
    password,
    avatarURL: avatar,
    verificationToken,
  });
};

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

const addToken = (id, token) => {
  return User.findByIdAndUpdate(id, { token });
};

const changeToken = (id) => {
  return User.findByIdAndUpdate(id, { token: "" });
};

const changeAvatar = (id, avatar) => {
  return User.findByIdAndUpdate(id, { avatar });
};

module.exports = {
  createUser,
  findUserByEmail,
  addToken,
  changeToken,
  changeAvatar,
};
