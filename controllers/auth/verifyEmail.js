const HttpError = require("../../helpers/HTTPError");
const User = require("../../service/schemas/user");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const { emailSchema } = require("../../schemas/emailSchema");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  const { error } = emailSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = ctrlWrapper(verifyEmail);
