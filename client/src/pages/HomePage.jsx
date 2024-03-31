import React from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";

function HomePage({ posts }) {
  console.log("posts", posts);
  return (
    <div className="container px-4 mx-auto my-8">
      {/* Container for the feed */}
      <div className="flex items-center justify-between mb-6">
        {/* Title section */}
        <h1 className="text-3xl font-bold">Posts</h1>
        {/* Link to create a new post */}
        <Link
          to="/create-post"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Create Post
        </Link>
      </div>
      {/* Render the posts */}
      <div className="space-y-4">
        {posts ? (
          // If posts data is available, map through each post and render a Post component for each
          posts.map((post) => <Post key={post._id} {...post} />)
        ) : (
          // If posts data is not available, display a loading message
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
