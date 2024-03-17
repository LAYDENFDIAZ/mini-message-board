import Post from "./Post";
import PostPage from "../pages/PostPage";
import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom"; // Import Link from react-router-dom
import { fetchPosts } from "../api";

function Feed() {
  const [posts, setPosts] = useState(null);

  const refreshPosts = async () => {
    const serverPosts = await fetchPosts();
    setPosts(serverPosts);
  };

  useEffect(() => {
    try {
      refreshPosts();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  const renderPosts = () => {
    return posts ? (
      posts.map((post, index) => <Post key={index} {...post} />)
    ) : (
      <p>Loading...</p>
    );
  };

  return (
    <div className="container px-4 mx-auto">
      <div className="flex items-center justify-between my-4">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          to="/create-post"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Create Post
        </Link>
      </div>
      {renderPosts()}
      <Routes>
        <Route path="/PostPage" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default Feed;
