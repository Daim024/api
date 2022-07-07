var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");
require("./database/config");
var passport = require("passport");
require("./auth/auth");
var userRouter = require("./routers/user");
var authRouter = require("./routers/auth");
var moduleRouter = require("./routers/module");
var noteRouter = require("./routers/note");
var taskListRouter = require("./routers/taskList");
var taskRouter = require("./routers/task");
var securityResponseRouter = require("./routers/securityResponse")
//var eventRouter = require("./routers/event");


var app = express();

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(authRouter);
app.use( passport.authenticate("jwt", { session: false }));
app.use("/users", userRouter);
app.use("/security", securityResponseRouter);
app.use("/modules", moduleRouter);
app.use("/notes", noteRouter);
app.use("/lists", taskListRouter);
app.use("/tasks", taskRouter);

//app.use("/event", eventRouter);


module.exports = app;