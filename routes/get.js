require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const fetchBlogs = require("../models/blog");
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.get("/", async (req, res) => {
  res.render("index", {recents: await fetchBlogs.find().limit(3).sort({$natural:-1}), path: req.originalUrl});
});
module.exports = router;
