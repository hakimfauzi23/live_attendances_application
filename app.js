require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const verifyToken = require("./middlewares/verifyToken");

const indexRouter = require("./routes/index");
const divisionsRouter = require("./routes/divisions");
const jobTitlesRouter = require("./routes/job-titles");
const employeesRouter = require("./routes/employee");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const settingRouter = require("./routes/setting");
const absencesRouter = require("./routes/absences-data");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", verifyToken, usersRouter);
app.use("/divisions", verifyToken, divisionsRouter);
app.use("/job-titles", verifyToken, jobTitlesRouter);
app.use("/employees", verifyToken, employeesRouter);
app.use("/users", verifyToken, usersRouter);
app.use("/auth", authRouter);
app.use("/settings", verifyToken, settingRouter);
app.use("/absences", verifyToken, absencesRouter);

module.exports = app;
