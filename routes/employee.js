var express = require("express");
var router = express.Router();

const employeeHandler = require("./handler/employees");

router.post("/", employeeHandler.create);
router.get("/", employeeHandler.getAll);
router.get("/:id", employeeHandler.get);
router.put("/:id", employeeHandler.update);
router.delete("/:id", employeeHandler.destroy);

module.exports = router;
