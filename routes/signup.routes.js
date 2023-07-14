const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { isLoggedOut } = require("../middlewares/secure-routes.middlewear");

router.get("/signup", (req, res, next) => {
  res.render("authFolder/signup");
});

router.post("/signup", async (req, res) => {
  try {
    const userId = uuidv4();
    const data = { ...req.body, userId };
    console.log("this is my data:", req.body);
    delete data.password;
    const salt = bcrypt.genSaltSync(13);
    data.passwordHash = bcrypt.hashSync(req.body.password, salt);
    // const data = { ...req.body };
    const newUser = await User.create(data);
    console.log("my newUser:", newUser);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
