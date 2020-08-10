const express = require("express");
var router = express.Router();
const fetchBlogs = require("../models/blog");
const authorinfo = require("../models/author");
router.get("/archive", async (req, res) => {
    res.render("blog/archive", {posts: await fetchBlogs.find().sort({$natural:-1}), path: req.originalUrl});
  });
router.get("/:url", async (req, res) => {
    var blog = await fetchBlogs.findOne({ url : req.params.url.toLowerCase() })
    if (!blog) { return res.sendStatus(404); }
  res.render("blog/articlesingle", {post: blog, path: req.originalUrl});
});
router.get("/category/:name", async (req, res) => {
    var blog = await fetchBlogs.find({ category : req.params.name.toLowerCase() }).sort({$natural:-1})
    if (!blog) { return res.sendStatus(404); }
  res.render("blog/categories", {posts: blog, path: req.originalUrl, cat: req.params.name });
});
router.get("/author/:name", async (req, res) => {
    var blog = await fetchBlogs.find({ aurl : req.params.name.toLowerCase() }).sort({$natural:-1})
    var aifo = await authorinfo.findOne({ url : req.params.name.toLowerCase() })
    if (!aifo) { return res.sendStatus(404); }
  res.render("blog/author", {posts: blog, author: aifo, path: req.originalUrl});
});
router.get("/new", async (req, res) => {
    var blog = await fetchBlogs.findOne({ title : req.params.blogtitle })
    if (!blog) { return res.sendStatus(404); }
  res.render("articlesingle", {result: blog, path: req.originalUrl});
});
module.exports = router;