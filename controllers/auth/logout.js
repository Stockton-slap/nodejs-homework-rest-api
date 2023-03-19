const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { changeToken } = require("../../service/userDb");

const logout = async (req, res) => {
  const { _id } = req.user;

  await changeToken(_id);

  res.status(204).json({ message: req.user });
};

module.exports = ctrlWrapper(logout);
