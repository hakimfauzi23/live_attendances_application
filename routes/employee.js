var express = require("express");
var router = express.Router();

const employeeHandler = require("./handler/employees");
const verifyRole = require("../middlewares/verifyRole");

router.post("/", verifyRole("ADMIN", "HR"), employeeHandler.create);
router.get("/", verifyRole("ADMIN", "HR"), employeeHandler.getAll);
router.get("/:id", verifyRole("ADMIN", "HR"), employeeHandler.get);
router.put("/:id", verifyRole("ADMIN", "HR"), employeeHandler.update);
router.delete("/:id", verifyRole("ADMIN", "HR"), employeeHandler.destroy);

module.exports = router;
