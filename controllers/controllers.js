const service = require("../service/db");
const { addSchema } = require("../schemas/addSchema");
const { HttpError } = require("../helpers/helperHTTPError");

const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await service.getContactsList();

    res.status(200).json(allContacts);
  } catch (error) {
    res.json({ message: "Server error." });
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.getById(contactId);

    if (!contact) {
      throw Error();
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Not found." });
    next(error);
  }
};

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

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await service.removeContact(contactId);

    if (!contactId) {
      throw Error();
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Not found." });
    next(error);
  }
};

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

const changeContactFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await service.updateStatusContact(contactId, req.body);

    if (!contact) {
      throw HttpError(404, "Not found.");
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Missing field 'favorite'." });
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  changeContactFavorite,
};
