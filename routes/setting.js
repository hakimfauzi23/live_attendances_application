var express = require("express");
var router = express.Router();

const settingHandler = require("./handler/settings");

router.post("/", settingHandler.create);
router.get("/", settingHandler.getAll);
router.get("/:id", settingHandler.get);
router.put("/:id", settingHandler.update);
router.delete("/:id", settingHandler.destroy);

module.exports = router;
