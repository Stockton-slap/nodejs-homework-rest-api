const Contact = require("../service/schemas/contact");

const getContactsList = () => {
  return Contact.find();
};

const getById = (id) => {
  return Contact.findOne({ _id: id });
};

const addNewContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove(id);
};

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  getContactsList,
  getById,
  addNewContact,
  removeContact,
  updateContact,
};
