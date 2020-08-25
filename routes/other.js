"use strict";

require("dotenv").config();
const express = require("express");
var router = express.Router();
const contributors = require("../models/contributors");
router.get("/contributors", async (req, res) => {
  res.render("other/contributors", {
    cbs: await contributors.find(),
    path: req.originalUrl,
  });
});
router.get("/legal/terms", async (req, res) => {
  res.render("other/tos", { path: req.originalUrl });
});
router.get("/legal/privacy", async (req, res) => {
  res.render("other/privacypolicy", { path: req.originalUrl });
});
router.get("/legal/refundpolicy", async (req, res) => {
  res.render("other/refundPolicy", { path: req.originalUrl });
});
router.get("/legal/disclaimer", async (req, res) => {
  res.render("other/disclaimer", { path: req.originalUrl });
});
router.get("/contribute", async (req, res) => {
  res.render("other/contribute", { path: req.originalUrl });
});
router.post("/test", async (req, res) => {
  res.send(req.body);
});
module.exports = router;
