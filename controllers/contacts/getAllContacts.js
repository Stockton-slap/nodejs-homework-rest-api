const service = require("../../service/contactDb");

const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await service.getContactsList();

    res.status(200).json(allContacts);
  } catch (error) {
    res.json({ message: "Server error." });
    next(error);
  }
};

module.exports = getAllContacts;
