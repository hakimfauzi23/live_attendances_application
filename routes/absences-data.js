var express = require("express");
var router = express.Router();

const absencesHandler = require("./handler/absences-data");
const verifyRole = require("../middlewares/verifyRole");

router.post("/clock-in", absencesHandler.clockIn);
router.put("/clock-out", absencesHandler.clockOut);
router.get("/my-absences", absencesHandler.getMyAbsences);
router.get("/", verifyRole("ADMIN", "HR"), absencesHandler.getAll);
router.get(
  "/:id",
  verifyRole("ADMIN", "HR"),
  absencesHandler.getAbsencesByUserId
);

module.exports = router;
