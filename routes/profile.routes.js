const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

//Create book 
router.get("/create-book", (req, res) => {
  res.render("create-book");
});

//creating book
router.post("/create-book"(req, res)=>{
  
})

module.exports = router;
