import axios from "axios";
const BASE_URL = "http://localhost:3001/api";

export const fetchPosts = async () => {
  const data = await axios.get(`${BASE_URL}/posts`);
  const posts = data.data;
  return posts;
};

export const fetchPost = async (postId) => {
  const data = await axios.get(`${BASE_URL}/posts/${postId}`);
  const post = data.data;
  console.log(" from axios", post);
  return post;
};

export const addComment = async (postId, commentData) => {
  const data = await axios.post(
    `${BASE_URL}/posts/${postId}/comments`,
    commentData
  );

  console.log("Comment added:", data);
};

export const createPost = async ({ title, content }) => {
  const data = await axios.post(`${BASE_URL}/posts/create-post`, {
    title,
    content,
  });

  console.log("from api", title, content);
};
