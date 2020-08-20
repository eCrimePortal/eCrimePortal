require("dotenv").config();
const express = require("express");
var router = express.Router();

router.get("/faq", async (req, res) => {
  res.render("resources/faq", { path: req.url });
});
router.get("/cybersafetyhandbook", async (req, res) => {
    res.render("resources/cshb", { path: req.url });
});
module.exports = router;