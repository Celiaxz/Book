const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Book = require("../models/Book.model");

const {
  isLoggedIn,
  isLoggedOut,
} = require("../middlewares/secure-routes.middlewear");

router.get("/profile", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const { myBooks, readOnlyBooks } = await getBookCategories(_id);
  console.log("MyBooks: ", myBooks);
  console.log("readOnlyBooks: ", readOnlyBooks);
  const data = {
    active: "home",
    user: req.session.currentUser,
    myBooks,
    readOnlyBooks,
  };
  res.render("profile", data);
});

router.get("/profile/:item", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const item = req.params.item;
  const { myBooks, readOnlyBooks } = await getBookCategories(_id);
  let data;
  if (item === "home") {
    data = {
      active: "home",
      user: req.session.currentUser,
      myBooks,
      readOnlyBooks,
    };
  } else if (item == "library") {
    // const { myBooks, readOnlyBooks } = await getBookCategories(_id);
    data = {
      active: "library",
      user: req.session.currentUser,
      myBooks,
      readOnlyBooks,
    };
  }
  res.render("profile", data);
});

router.get("/profile/book/:bookId", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const bookId = req.params.bookId;
  const response = await getBookCategories(_id, bookId);
  const isReadOnly = response.selectedBook.userId !== _id;
  const data = {
    active: "book",
    selectedBook: response.selectedBook,
    myBooks: response.myBooks,
    readOnlyBooks: response.readOnlyBooks,
    user: req.session.currentUser,
    isReadOnly,
  };
  res.render("profile", data);
});

router.get("/profile/lock/:bookId", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  const bookId = req.params.bookId;
  const book = await Book.findById(bookId);
  console.log("bookId: ", bookId);
  console.log("BOOKS: ", book);
  const isPublicToggle = !book.isPublic;
  if (_id === book.userId) {
    await Book.findByIdAndUpdate(
      bookId,
      { isPublic: isPublicToggle },
      { new: true }
    );
  }
  res.redirect("/profile/home");
});

router.get("/profile/user/logout", isLoggedIn, async (req, res, next) => {
  console.log("Logging user out");
  delete req.session.currentUser;
  res.redirect("/");
});

router.get("/profile/user/delete", isLoggedIn, async (req, res, next) => {
  const { _id } = req.session.currentUser;
  await User.findByIdAndDelete(_id);
  await Book.deleteMany({ userId: _id });
  delete req.session.currentUser;
  res.redirect("/");
});

//Create book
router.get("/create-book", isLoggedIn, (req, res) => {
  res.render("create-book");
});

//creating book
router.post("/create-book", async (req, res) => {
  console.log(" book req body: ", req.session);
  const userId = req.session.currentUser._id;
  console.log("POST create-book: ", req.body);
  try {
    const book = await Book.create({ ...req.body, userId, isPublic: true });
    console.log("Created Book: ", book);
    res.redirect("/profile/book/" + book._id);
  } catch (error) {
    console.log("error while creating book: ", error);
  }
});

// // book details and writing page
// router.get("/writing/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const book = await Book.findById(id).populate("author");
//     //able to create books with the correct author reference and
//     //retrieve also authors  information when rending the writing view
//     // console.log("BOOK: ", data);
//     res.render("writing", book);
//   } catch (error) {
//     console.error(error);
//   }
// });

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

    res.redirect("/profile/book/" + id);
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

    res.redirect("/profile/book/" + id);
  } catch (error) {
    console.error(error);
  }
});

//save Book
router.post("/book/:id/save", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    console.log("Data: ", data);
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { content: data },
      { new: true }
    );

    res.redirect("/profile/book/" + id);
  } catch (error) {
    console.error(error);
  }
});

async function getBookCategories(userId, bookId) {
  const myBooks = [];
  const readOnlyBooks = [];
  let selectedBook;
  const allBooks = await Book.find({});
  allBooks.forEach((book) => {
    if (bookId !== undefined && book._id == bookId) {
      selectedBook = book;
    }
    if (book.userId === userId) {
      myBooks.push(book);
    } else if (book.isPublic) {
      readOnlyBooks.push(book);
    }
  });
  return { myBooks, readOnlyBooks, selectedBook };
}

module.exports = router;
