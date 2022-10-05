var express = require("express");
var router = express.Router();

const absencesHandler = require("./handler/absences-data");

router.post("/clock-in", absencesHandler.clockIn);
router.put("/clock-out", absencesHandler.clockOut);
router.get("/my-absences", absencesHandler.getMyAbsences);
router.get("/", absencesHandler.getAll);
router.get("/:id", absencesHandler.getAbsencesByUserId);

module.exports = router;
