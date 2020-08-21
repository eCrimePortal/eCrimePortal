require("dotenv").config();
const express = require("express");
var router = express.Router();

router.get("/faq", async (req, res) => {
  res.render("resources/faq", { path: req.url });
});
router.get("/cybersafetyhandbook", async (req, res) => {
    res.render("resources/cshb", { path: req.url });
});
router.get("/bestpractices", async (req, res) => {
  res.render("resources/bestprac", { path: req.url });
});
router.get("/tools", async (req, res) => {
  res.render("resources/tools", { path: req.url });
});
router.get("/threat%20level", async (req, res) => {
  res.render("resources/weekal", { path: req.url });
});
module.exports = router;