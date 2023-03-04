const express = require("express");
const router = express.Router();
const register = require("../../controllers/auth/register");
const login = require("../../controllers/auth/login");
const logout = require("../../controllers/auth/logout");
const currentUser = require("../../controllers/auth/currentUser");
const auth = require("../../middlewares/auth");

router.post("/signup", register);

router.post("/login", login);

router.post("/logout", auth, logout);

router.get("/current", auth, currentUser);

module.exports = router;
