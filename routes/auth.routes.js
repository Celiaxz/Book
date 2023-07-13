const router = require("express").Router();

const User = require("../models/User.model")

/*
router.get("/", (req, res, next) => {
  res.render("index");
}); */

// GET route -> to display the signup form to users
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

module.exports = router;
