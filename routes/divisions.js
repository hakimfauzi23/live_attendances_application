var express = require("express");
var router = express.Router();

const divisionHandler = require("./handler/divisions");

router.get("/", divisionHandler.getAll);
router.get("/:id", divisionHandler.get);
router.post("/", divisionHandler.create);
router.put("/:id", divisionHandler.update);
router.delete("/:id", divisionHandler.destroy);

module.exports = router;
