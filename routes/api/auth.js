const express = require("express");
const router = express.Router();
const register = require("../../controllers/auth/register");
const login = require("../../controllers/auth/login");
const logout = require("../../controllers/auth/logout");
const currentUser = require("../../controllers/auth/currentUser");
const updateAvatar = require("../../controllers/auth/updateAvatar");
const verifyEmail = require("../../controllers/auth/verifyEmail");
const resendVerifyEmail = require("../../controllers/auth/resendVerifyEmail");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");

router.post("/signup", register);

router.post("/login", login);

router.post("/logout", auth, logout);

router.get("/current", auth, currentUser);

router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", resendVerifyEmail);

module.exports = router;
