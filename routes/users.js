const express = require("express");
const router = express.Router();

const usersHandler = require("./handler/users");

router.post("/register", usersHandler.register);
router.get("/", usersHandler.getAll);
router.get("/:id", usersHandler.get);
router.put("/:id", usersHandler.update);
router.delete("/:id", usersHandler.destroy);

module.exports = router;
