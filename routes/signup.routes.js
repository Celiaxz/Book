const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.get("/", (req, res, next) => {
    res.render("auth/signup");
});

module.exports = router;