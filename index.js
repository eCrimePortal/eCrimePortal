require("dotenv").config();
const mongoose = require("mongoose");
var gets = require("./routes/get");
var blogs = require("./routes/blogs");
var community = require("./routes/community");
var other = require("./routes/other");
var request = require("./routes/request");
var resources = require("./routes/resources");
var donate = require("./routes/donate");
const express = require("express");
const app = express();
mongoose.connect(process.env.mongo, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.log.bind(console, "Could not connect to the database!"));
db.once("open", function () {
  console.log("Connected to the database!");
});
app.use(express.static("assets"));
app.set("views", __dirname + "/pages");
app.set("view engine", "ejs");
app.use("/", gets);
app.use("/community", community);
app.use("/blog", blogs);
app.use("/", donate);
app.use("/", other);
app.use("/request", request);
app.use("/resources", resources);
// app.use('/', posts)

app.use(function (req, res) {
  res.locals.url = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.locals.four = req.url;
  res.status(404).render("error/404", { path: req.url });
});

app.use(function (err, req, res) {
  res.locals.url = req.protocol + "://" + req.get("host") + req.originalUrl;
  res.locals.rror = err;
  console.log(err);
  res.status(500).render("error/500", { path: req.url });
});
// listen for requests
const listener = app.listen(process.env.port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
