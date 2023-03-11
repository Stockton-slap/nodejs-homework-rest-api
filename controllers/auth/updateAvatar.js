const ctrlWrapper = require("../../helpers/ctrlWrapper");
const fs = require("fs/promises");
const path = require("path");
const { changeAvatar } = require("../../service/userDb");
const Jimp = require("jimp");
const HttpError = require("../../helpers/HTTPError");

const avatarsFolder = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempFolder, originalname } = req.file;

  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsFolder, filename);

  await fs.rename(tempFolder, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await changeAvatar(_id, avatarURL);

  Jimp.read(resultUpload, (err, avatar) => {
    if (err) throw HttpError(404, "Not found");

    avatar.resize(250, 250).quality(60).write(`${resultUpload}`);
  });

  res.json({ avatarURL });
};

module.exports = ctrlWrapper(updateAvatar);
