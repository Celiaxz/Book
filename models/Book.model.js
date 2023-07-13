const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bookSchema = new Schema({
  Author: {
    type: String,
    lowercase: true,
    trim: true,
  },
  title: String,
  genre: {
    enum: ["Poetry, prose, Drama"],
  },
  description: String,
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "book",
  },
  timestamps: true,
  publishingDate: Number,
});

const User = model("User", userSchema);

module.exports = User;
