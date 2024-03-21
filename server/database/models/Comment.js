const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Foreign key to the post that this comment belongs to
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const PostModel = mongoose.model("Post", CommentSchema);

module.exports = PostModel;
