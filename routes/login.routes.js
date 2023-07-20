const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { isLoggedOut } = require("../middlewares/secure-routes.middlewear");
router.get("/login", isLoggedOut, (req, res) => {
  res.render("authFolder/login");
});
router.post("/login", isLoggedOut, async (req, res) => {
  const userLogin = req.body;
  try {
    const checkedUser = await User.findOne({ username: userLogin.username });
    if (checkedUser) {
      if (bcrypt.compareSync(userLogin.password, checkedUser.passwordHash)) {
        const loggedUser = { ...checkedUser._doc };
        delete loggedUser.passwordHash;
        req.session.currentUser = loggedUser;
        res.redirect("/profile");
      } else {
        console.log("Incorect password or username");
        res.render("authFolder/login", {
          errMessage: "Incorect password or username",
          // res.render("authFolder/login", {username : currentUser.username, errorMessage})
        });
      }
    } else {
      console.log("No user");
      res.render("authFolder/login", { errMessage: "User doesnt exsist" });

      // res.render("auth/login", {username : currentUser.username, errorMessage})
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
