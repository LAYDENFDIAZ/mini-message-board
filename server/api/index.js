const express = require("express");
const database = require("../database");

const router = express.Router();

// Route to get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await database.getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error retrieving posts", err);
    res.status(500).send(err.message);
  }
});
router.post("/posts/create-post", async (req, res) => {
  try {
    const post = await database.insertPost(req.body);
    console.log(post);

    res.status(201).json(post); // Sending the created post back, or just a success message
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating the post" }); // Send a server error response
  }
});

router.get("/posts/:postId", async (req, res) => {
  //const post = database.getAllPosts();
  const { postId } = req.params;
  const post = await database.getPost(postId);
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
  try {
    await database.insertPost({
      title: req.body.title,
      content: req.body.content,
    });
    res.status(201).send("Post added successfully");
  } catch (err) {
    console.error("Error creating new post", err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
