const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  author: String,
  title: String,
  genre: {
    enum: [
      "Action/Adventure, Biographies and Autobiographies, Cookbook, Crime, Drama, Essays, History, Horror, Mystery, Poetry, Romance, Science Fiction (Sci-Fi), Short Stories, Thriller",
    ],
  },
  userId: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  description: String,
  content: String,
  // favouriteBook: {
  //   type: Boolean,
  //   default: false,
  // },
});

const Book = model("Book", bookSchema);

module.exports = Book;
