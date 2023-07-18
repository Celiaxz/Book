const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { isLoggedOut } = require("../middlewares/secure-routes.middlewear");
const uploader = require('../config/cloudinary.config.js');

router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("authFolder/signup");
});

router.post("/signup", uploader.single("profileImage"), isLoggedOut, async (req, res) => {
  const image = req.file.path;
  try {
    const userId = uuidv4();
    const data = { ...req.body, userId, profileImage: image };
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