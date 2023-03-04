const Contact = require("./schemas/contact");

const getContactsList = (owner, skip, limit) => {
  return Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit });
};

const getById = (id) => {
  return Contact.findOne({ _id: id });
};

const addNewContact = (body, owner) => {
  return Contact.create({ ...body, owner, favorite: false });
};

const removeContact = (id) => {
  return Contact.findByIdAndRemove(id);
};

const updateContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const updateStatusContact = (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

module.exports = {
  getContactsList,
  getById,
  addNewContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
