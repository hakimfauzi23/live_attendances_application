const express = require("express");
const router = express.Router();

const authHandler = require("./handler/auth");
var verifyToken = require("../middlewares/verifyToken");

router.post("/login", authHandler.login);
router.post("/logout", verifyToken, authHandler.logout);
router.post("/refresh-token", authHandler.refreshToken);
router.put("/change-password",verifyToken, authHandler.changePassword);

module.exports = router;
