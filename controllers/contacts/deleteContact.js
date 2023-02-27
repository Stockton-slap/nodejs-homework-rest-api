const service = require("../../service/contactDb");

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

module.exports = deleteContact;
