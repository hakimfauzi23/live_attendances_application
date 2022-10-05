const express = require("express");
const router = express.Router();

const usersHandler = require("./handler/users");
const verifyRole = require("../middlewares/verifyRole");

router.post("/register", verifyRole("ADMIN", "HR"), usersHandler.register);
router.get("/", verifyRole("ADMIN", "HR"), usersHandler.getAll);
router.get("/:id", verifyRole("ADMIN", "HR"), usersHandler.get);
router.put("/:id", verifyRole("ADMIN", "HR"), usersHandler.update);
router.delete("/:id", verifyRole("ADMIN", "HR"), usersHandler.destroy);

module.exports = router;
