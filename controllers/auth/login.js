const HttpError = require("../../helpers/HTTPError");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { findUserByEmail, addToken } = require("../../service/userDb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { password, email } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user._id };
  const secret = process.env.SECRET_KEY;
  const options = { expiresIn: "20d" };

  const token = jwt.sign(payload, secret, options);

  await addToken(user._id, token);

  res.status(200).json({ token });
};

module.exports = ctrlWrapper(login);
