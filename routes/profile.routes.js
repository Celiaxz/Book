const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

module.exports = router;
