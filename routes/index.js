var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/punch", function(req, res, next) {
  res.send("Aww yea");
});

module.exports = router;
