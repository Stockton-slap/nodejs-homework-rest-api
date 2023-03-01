const service = require("../../service/contactDb");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await service.getById(contactId);

  if (!contact) {
    throw Error();
  }

  res.status(200).json(contact);
};

module.exports = ctrlWrapper(getContactById);
