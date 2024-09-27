const service = require("../../service/contactDb");
const { HttpError } = require("../../helpers/HTTPError");
const { addSchema } = require("../../schemas/addSchema");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const { error } = addSchema.validate({ name, email, phone });

  if (error) {
    throw HttpError(404, error.message);
  }

  const contact = await service.addNewContact({ name, email, phone });

  res.status(201).json(contact);
};

module.exports = ctrlWrapper(addContact);
