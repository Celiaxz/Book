const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.get("/login", (req, res, next) => {
  res.render("authFolder/login");
});

router.post("/login", async (req, res) => {
  try {
    const userLogin = req.body;
    const checkUser = await User.findOne({ username: userLogin.username });
    res.redirect("/profile");
  } catch (error) {
    console.log("error while loggin in: ", error);
  }
});
module.exports = router;
