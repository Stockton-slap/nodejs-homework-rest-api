const service = require("../../service/contactDb");
const { HttpError } = require("../../helpers/HTTPError");
const { addSchema } = require("../../schemas/addSchema");

const changeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const contact = await service.updateContact(contactId, req.body);

    if (!contact) {
      throw HttpError(404, "Not found.");
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Missing fields." });
    next(error);
  }
};

module.exports = changeContact;
