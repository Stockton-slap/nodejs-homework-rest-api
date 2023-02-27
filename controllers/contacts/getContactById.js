const service = require("../../service/contactDb");

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

module.exports = getContactById;
