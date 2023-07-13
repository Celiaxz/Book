const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Book = require("../models/Book.model");

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

//Create book
router.get("/create-book", (req, res) => {
  res.render("create-book");
});

//creating book
router.post("/create-book", async (req, res) => {
  console.log(" book req body: ", req.body);
  try {
    const book = await Book.create(req.body);
    res.redirect("/writing/" + book._id);
  } catch (error) {
    console.log("error while creating book: ", error);
  }
});

// book details and writing page
router.get("/writing/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id).populate("author");
    //able to create books with the correct author reference and
    //retrieve also authors  information when rending the writing view

    res.render("writing", { book });
  } catch (error) {
    console.error(error);
  }
});
//Update Book
router.post("/book/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );

    res.redirect("/writing/" + updatedBook._id);
  } catch (error) {
    console.error(error);
  }
});

//delet Book
router.post("/book/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);
    // add other many actions

    res.redirect("/profile");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
