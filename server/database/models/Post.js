const mongoose = require("mongoose");

// Define the schema
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post", // References the Post model itself
    },
  ],
});

// Create the Post model
const PostModel = mongoose.model("Post", postSchema);

// Export the model
module.exports = PostModel;
