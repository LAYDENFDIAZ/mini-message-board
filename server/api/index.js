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

router.get("/posts/:postId", async (req, res) => {
  //const post = database.getAllPosts();
  const { postId } = req.params;
  const post = await database.getPost(postId);
  res.send(post);
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
