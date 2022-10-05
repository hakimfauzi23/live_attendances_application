var express = require("express");
var router = express.Router();

const jobTitlesHandler = require("./handler/job-titles");
const verifyRole = require("../middlewares/verifyRole");

router.get("/", verifyRole("ADMIN", "HR"), jobTitlesHandler.getAll);
router.get("/:id", verifyRole("ADMIN", "HR"), jobTitlesHandler.get);
router.post("/", verifyRole("ADMIN", "HR"), jobTitlesHandler.create);
router.put("/:id", verifyRole("ADMIN", "HR"), jobTitlesHandler.update);
router.delete("/:id", verifyRole("ADMIN", "HR"), jobTitlesHandler.destroy);

module.exports = router;
