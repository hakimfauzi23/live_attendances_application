var express = require("express");
var router = express.Router();

const settingHandler = require("./handler/settings");
const verifyRole = require("../middlewares/verifyRole");

router.post("/", verifyRole("ADMIN", "HR"), settingHandler.create);
router.get("/", verifyRole("ADMIN", "HR"), settingHandler.getAll);
router.get("/:id", verifyRole("ADMIN", "HR"), settingHandler.get);
router.put("/:id", verifyRole("ADMIN", "HR"), settingHandler.update);
router.delete("/:id", verifyRole("ADMIN", "HR"), settingHandler.destroy);

module.exports = router;
