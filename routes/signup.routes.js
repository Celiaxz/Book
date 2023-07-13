const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.get("/signup", (req, res, next) => {
  res.render("authFolder/signup");
});

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    console.log("this is my data:", req.body);
    // const data = { ...req.body };
    const newUser = await User.create(data);
    console.log("my newUser:", newUser);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
