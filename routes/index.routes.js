const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/library", (req, res) => {
  res.render("bookSearch");
});
module.exports = router;
