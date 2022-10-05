var express = require("express");
var router = express.Router();

const absencesHandler = require("./handler/absences-data");

router.post("/clock-in", absencesHandler.clockIn);
router.put("/clock-out", absencesHandler.clockOut);

module.exports = router;
