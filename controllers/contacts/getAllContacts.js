const service = require("../../service/contactDb");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;

  const allContacts = await service
    .getContactsList(owner, skip, limit)
    .populate("owner", "email subscription");

  res.status(200).json(allContacts);
};

module.exports = ctrlWrapper(getAllContacts);
