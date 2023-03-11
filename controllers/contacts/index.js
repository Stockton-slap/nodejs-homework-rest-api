const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const changeContact = require("./changeContact");
const changeContactFavorite = require("./changeContactFavorite");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  changeContactFavorite,
};
