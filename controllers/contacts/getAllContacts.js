const service = require("../../service/contactDb");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const getAllContacts = async (req, res, next) => {
  const allContacts = await service.getContactsList();

  res.status(200).json(allContacts);
};

module.exports = ctrlWrapper(getAllContacts);
