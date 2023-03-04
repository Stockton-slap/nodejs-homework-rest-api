const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const authentificate = require("../../middlewares/authentificate");

router.get("/", authentificate, ctrl.getAllContacts);

router.get("/:contactId", authentificate, ctrl.getContactById);

router.post("/", authentificate, ctrl.addContact);

router.delete("/:contactId", authentificate, ctrl.deleteContact);

router.put("/:contactId", authentificate, ctrl.changeContact);

router.patch(
  "/:contactId/favorite",
  authentificate,
  ctrl.changeContactFavorite
);

module.exports = router;
