const { regSchema } = require("../../schemas/regSchema");
const HttpError = require("../../helpers/HTTPError");
const sendEmail = require("../../helpers/sendEmail");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { createUser, findUserByEmail } = require("../../service/userDb");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const saltRounds = 10;
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { password, email } = req.body;

  const { error } = regSchema.validate({ password, email });

  if (error) {
    throw HttpError(400, "Ошибка от Joi или другой библиотеки валидации");
  }

  const user = await findUserByEmail(email);

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);

  const hashPassword = await bcrypt.hash(password, saltRounds);

  const verificationToken = nanoid();

  const newUser = await createUser(
    hashPassword,
    req.body,
    avatarURL,
    verificationToken
  );

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = ctrlWrapper(register);
