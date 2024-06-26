const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  likes: {
    type: Number,
    default: 0,
  },

  replies: [
    {
      postId: ForeignKey to Post,
    }
  ],
});

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
