const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { findUserById } = require("../../service/userDb");

const logout = async (req, res) => {
  const { _id } = req.user;

  await findUserById(_id);

  res.status(204).json({ message: req.user });
};

module.exports = ctrlWrapper(logout);
