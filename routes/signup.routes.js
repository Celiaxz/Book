const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { isLoggedOut } = require("../middlewares/secure-routes.middlewear");

router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("authFolder/signup");
});

router.post("/signup", isLoggedOut, async (req, res) => {
  try {
    const data = { ...req.body };
    console.log("this is my data:", req.body);
    delete data.password;
    const salt = bcrypt.genSaltSync(13);
    data.passwordHash = bcrypt.hashSync(req.body.password, salt);
    const newUser = await User.create(data);
    console.log("my newUser:", newUser);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
