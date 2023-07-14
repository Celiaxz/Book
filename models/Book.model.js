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
  bookId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  description: String,
  publishingDate: Number,
  content: String,

  // type: Schema.Types.ObjectId,
  // ref: "book",
  // timestamps: true,
});

const Book = model("Book", bookSchema);

module.exports = Book;
