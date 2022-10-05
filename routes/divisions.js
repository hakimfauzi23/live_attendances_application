var express = require("express");
var router = express.Router();

const divisionHandler = require("./handler/divisions");
const verifyRole = require("../middlewares/verifyRole");

router.get("/", verifyRole("ADMIN", "HR"), divisionHandler.getAll);
router.get("/:id", verifyRole("ADMIN", "HR"), divisionHandler.get);
router.post("/", verifyRole("ADMIN", "HR"), divisionHandler.create);
router.put("/:id", verifyRole("ADMIN", "HR"), divisionHandler.update);
router.delete("/:id", verifyRole("ADMIN", "HR"), divisionHandler.destroy);

module.exports = router;
