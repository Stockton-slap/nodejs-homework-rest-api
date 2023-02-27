const service = require("../../service/contactDb");
const { HttpError } = require("../../helpers/HTTPError");
const { addSchema } = require("../../schemas/addSchema");

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const { error } = addSchema.validate({ name, email, phone });

    if (error) {
      throw HttpError(404, error.message);
    }

    const contact = await service.addNewContact({ name, email, phone });

    res.status(201).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Missing required name field." });
    next(error);
  }
};

module.exports = addContact;
