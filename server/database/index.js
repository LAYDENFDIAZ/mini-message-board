const mongoose = require("mongoose");
const PostModel = require("./models/Post.js");

const getAllPosts = async () => {
  const posts = await PostModel.find();
  return posts;
};

const getPost = async (postId) => {
  const post = await PostModel.findById(postId);
  return post;
};

const insertPost = async ({ title, content }) => {
  const newPost = new PostModel({
    title: title,
    content: content,
  });

  await newPost.save();
};

module.exports = { database: mongoose, getAllPosts, getPost, insertPost };
