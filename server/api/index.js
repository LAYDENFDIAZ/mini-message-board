const express = require("express");
const database = require("../database");

const router = express.Router();

// Route to get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await database.getAllOriginPosts();
    res.status(200).json({ data: posts });
  } catch (err) {
    console.error("Error retrieving posts", err);
    res.status(500).send(err.message);
  }
});

router.get("/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = await database.getPost(postId);

  const getReplies = post.replies.map(async (replyId) => {
    return await database.getPost(replyId);
  });

  const postReplies = await Promise.all(getReplies);

  post.replies = postReplies;

  // handle case where post doesn't exist
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.send(post);
});

router.post("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const comment = req.body;

  try {
    if (!comment || !comment.content) {
      return res.status(400).json({ message: "Invalid comment data" });
    }

    const updatedPost = await database.addComment(postId, comment);
    res.status(201).json(updatedPost);
  } catch (error) {
    console.error("Error adding comment:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding the comment" });
  }
});

// Route to add a new post
router.post("/posts", async (req, res) => {
  // Validate request body
  if (!req.body.title || !req.body.content) {
    return res.status(400).send("Invalid post data");
  }
  try {
    const newPost = await database.insertPost({
      title: req.body.title,
      content: req.body.content,
    });
    res.status(201).send({ message: "Post added successfully", data: newPost });
  } catch (err) {
    console.error("Error creating new post", err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
