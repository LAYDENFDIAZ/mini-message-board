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
  try {
    const data = await axios.post(
      `${BASE_URL}/posts/${postId}/comments`,
      commentData
    );
    return data;
    console.log("Comment added:", data);
  } catch (error) {
    throw error;
  }
};

export const createPost = async ({ title, content }) => {
  const data = await axios.post(`${BASE_URL}/posts/create-post`, {
    title,
    content,
  });

  console.log("from api", title, content);
};
