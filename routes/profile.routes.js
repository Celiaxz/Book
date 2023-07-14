const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Book = require("../models/Book.model");
const { v4: uuidv4 } = require("uuid");
const {
  isLoggedIn,
  isLoggedOut,
} = require("../middlewares/secure-routes.middlewear");

router.get("/profile/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("GET profile: ", id);
  res.render(
    "profile",
    { userId: id },
    { userInSession: req.session.currentUser }
  );
});

//Create book
router.get("/create-book/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET create-book: ", id);
  res.render("create-book", { userId: id });
});

//creating book
router.post("/create-book", async (req, res) => {
  console.log(" book req body: ", req.body);
  const userId = req.body.userId;
  const bookId = uuidv4();
  console.log("POST create-book: ", userId);
  try {
    const book = await Book.create({ ...req.body, userId, bookId });
    console.log("Created Book: ", book);
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

//delete Book
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
