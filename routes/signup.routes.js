const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { isLoggedOut } = require("../middlewares/secure-routes.middlewear");
const uploader = require('../config/cloudinary.config.js');

router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("authFolder/signup");
});

const defaultProfileImage = './images/LOGO.png';

router.post("/signup", uploader.single("imageUrl"), isLoggedOut, async (req, res) => {
  try {
    const userId = uuidv4();
    const data = { ...req.body, userId };

    if (req.file) {
      const imageUrl = req.file.path;
      data.imageUrl = imageUrl;
    } else {
      data.imageUrl = defaultProfileImage; // Assign the default profile image
    }
    console.log("This is my data:", data);
    delete data.password;

    const salt = bcrypt.genSaltSync(13);
    data.passwordHash = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create(data);
    console.log("My newUser:", newUser);

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error signing up" });
  }
});

module.exports = router;
