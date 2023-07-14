const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.get("/login", (req, res, next) => {
  res.render("authFolder/login");
});

router.post("/login", async (req, res) => {
  const userLogin = req.body;
  try {
    const checkedUser = await User.findOne({ username: userLogin.username });
    console.log("print checkedUser :", checkedUser.password);
    console.log("print passwordHash :", checkedUser.passwordHash);
    console.log("print userLogin :", userLogin.password);
    if (checkedUser) {
      if (bcrypt.compareSync(userLogin.password, checkedUser.passwordHash)) {
        const loggedUser = { ...checkedUser._doc };
        delete loggedUser.passwordHash;
        req.session.userLogin = loggedUser;
        console.log(req.session);
        res.redirect("/profile/" + checkedUser.userId);
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
