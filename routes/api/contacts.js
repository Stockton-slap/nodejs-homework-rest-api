const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const auth = require("../../middlewares/auth");

router.get("/", auth, ctrl.getAllContacts);

router.get("/:contactId", auth, ctrl.getContactById);

router.post("/", auth, ctrl.addContact);

router.delete("/:contactId", auth, ctrl.deleteContact);

router.put("/:contactId", auth, ctrl.changeContact);

router.patch("/:contactId/favorite", auth, ctrl.changeContactFavorite);

module.exports = router;
