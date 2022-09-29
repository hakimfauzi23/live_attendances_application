var express = require("express");
var router = express.Router();

const jobTitlesHandler = require("./handler/job-titles");

router.get("/", jobTitlesHandler.getAll);
router.get("/:id", jobTitlesHandler.get);
router.post("/", jobTitlesHandler.create);
router.put("/:id", jobTitlesHandler.update);
router.delete("/:id", jobTitlesHandler.destroy);

module.exports = router;
