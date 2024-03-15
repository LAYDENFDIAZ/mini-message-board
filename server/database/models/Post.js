const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },

  likes: {
    type: Number,
    default: 0,
  },

  comments: [
    {
      content: String,
      author: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
