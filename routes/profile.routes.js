const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.get("/", (req, res, next) => {
  res.send("profile");
});

module.exports = router;
