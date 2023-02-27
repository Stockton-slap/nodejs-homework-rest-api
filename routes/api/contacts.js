const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  changeContact,
  changeContactFavorite,
} = require("../../controllers/contacts");

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

router.patch("/:contactId/favorite", changeContactFavorite);

module.exports = router;
