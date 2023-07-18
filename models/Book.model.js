const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookSchema = new Schema({
  author: {
    type: String,
  },
  title: String,
  genre: {
    enum: ["Poetry, prose, Drama"],
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
  publishingDate: Number,
  content: String,
});

const Book = model("Book", bookSchema);

module.exports = Book;
