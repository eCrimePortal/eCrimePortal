require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
const fetchBlogs = require("../models/blog");
const authorinfo = require("../models/author");
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.get("/", async (req, res) => {
  res.render("index", {recents: await fetchBlogs.find().limit(3).sort({$natural:-1}), path: req.url});
});
module.exports = router;
