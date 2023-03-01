const service = require("../../service/contactDb");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await service.removeContact(contactId);

  if (!contactId) {
    throw Error();
  }

  res.status(200).json(contact);
};

module.exports = ctrlWrapper(deleteContact);
