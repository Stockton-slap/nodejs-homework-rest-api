const express = require("express");
const Joi = require("joi");
const { HttpError } = require("../../helperHTTPError");

const router = express.Router();

const contacts = require("../../models/contacts");

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contacts.getListContacts();

    res.status(200).json(contactsList);
  } catch (error) {
    res.json({ message: "Server error." });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);

    if (!contact) {
      throw Error();
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Not found." });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(404, error.message);
    }

    const contactsList = await contacts.addContact(req.body);

    res.status(201).json(contactsList);
  } catch (error) {
    res.status(404).json({ message: "Missing required name field." });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.removeContact(contactId);

    if (!contactId) {
      throw Error();
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Not found." });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const contact = await contacts.updateContact(contactId, req.body);

    if (!contact) {
      throw HttpError(404, "Not found.");
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Missing fields." });
  }
});

module.exports = router;
