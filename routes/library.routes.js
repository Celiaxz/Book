const router = require("express").Router();
const axios = require("axios");
const url = "https://openlibrary.org/search.json?title=";

router.get("/library", (req, res) => {
  res.render("bookSearch");
});

// router.get("/library", async (req, res) => {
//   try {
//     const searchTerm = req.query.title;
//     console.log("searchTerm:", req.query.title);
//     const url = "https://openlibrary.org/search.json?title=";

//     // console.log("request.query: ", request.query);

//     const response = await axios.get(url);
//     console.log("received data: ", response);
//     // const books = response.data.docs;
//     // console.log("error ocurred while finding books: ", books);
//     // res.render("booksearch", { books });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.post("/library", async (req, res, next) => {
  try {
    // const myrequest = req.body;
    // const urlString = url + myrequest.bookTitle;
    const searchTerm = req.body.bookTitle;
    const searchUrl = `${url}${searchTerm}`;
    console.log("my searchUrl: ", searchUrl);
    const bookSearch = await axios.get(searchUrl);
    // console.log("my bookSearch: ", bookSearch);
    const books = bookSearch.data.docs.map((book) => ({
      title: book.title,
      key: book.key.split("/")[2],
      cover: book.cover_i
        ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : undefined,
      publishYear: book.first_publish_year,
      coverId: book.cover_i,
      author_name: book.author_name ? book.author_name.join(", ") : undefined,
    }));
    // console.log("books: ", books);
    res.render("books-search-result", { books });
  } catch (err) {
    console.log("something seems to be happening here: ", err);
  }
});

router.get("/library/:key/:coverId", async (req, res) => {
  try {
    console.log("In preview");
    const key = req.params.key;
    console.log("req.body: ", req.body);
    const coverId = req.params.coverId;
    const previewUrl = `https://openlibrary.org/works/${key}.json`;

    const response = await axios.get(previewUrl);
    console.log("response: ", response);
    const bookDetails = {
      cover: `http://covers.openlibrary.org/b/id/${coverId}-L.jpg`,
      title: response.data.title,
      description: response.data.description,
      links: response.data.links,
    };
    console.log("bookDetails: ", bookDetails);
    res.render("preview-book", { book: bookDetails });
  } catch (error) {}
});
module.exports = router;
//http://openlibrary.org${book.preview_url}
