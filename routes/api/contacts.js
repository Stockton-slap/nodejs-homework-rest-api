const express = require("express");
const router = express.Router();
const CtrlContact = require("../../controllers/controllers");

router.get("/", CtrlContact.getAllContacts);

router.get("/:contactId", CtrlContact.getContactById);

router.post("/", CtrlContact.addContact);

router.delete("/:contactId", CtrlContact.deleteContact);

router.put("/:contactId", CtrlContact.changeContact);

module.exports = router;
