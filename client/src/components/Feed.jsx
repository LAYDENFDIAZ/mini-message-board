import Post from "./Post";
import PostPage from "../pages/PostPage";
import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom"; // Import Link from react-router-dom

function Feed() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/posts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderPosts = () => {
    return data ? (
      data.map((post, index) => <Post key={index} {...post} />)
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
