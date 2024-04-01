const mongoose = require("mongoose");
const PostModel = require("./models/Post.js");
const UserModel = require("./models/User.js");

const getAllOriginPosts = async () => {
  const posts = await PostModel.find({ parentPost: { $exists: false } });
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

const addComment = async (postId, commentData) => {
  try {
    if (!commentData || !commentData.content) {
      throw new Error("Invalid comment data");
    }

    const post = await PostModel.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    const replyPost = new PostModel({
      parentPost: postId,
      content: commentData.content,
    });

    await replyPost.save();

    post.replies.push(replyPost._id);

    await post.save();

    return post;
  } catch (error) {
    throw error;
  }
};

const createUser = async (userName, password) => {
  const newUser = new UserModel({
    username: userName,
    password: password,
  });

  await newUser.save();

  return newUser;
};

const findUserById = (id) => {
  const user = UserModel.findById(id);
  return user;
};

const findUserByUsername = async (username) => {
  const user = await UserModel.findOne({ username });
  return user;
};

module.exports = {
  database: mongoose,
  getAllOriginPosts,
  getPost,
  insertPost,
  addComment,
  createUser,
  findUserById,
  findUserByUsername,
};
