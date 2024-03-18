import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api";
import Post from "./Post";

function Feed() {
  // State to store the posts data
  const [posts, setPosts] = useState(null);

  // Effect hook to fetch posts data when the component mounts
  useEffect(() => {
    // Function to fetch posts data from the API
    const refreshPosts = async () => {
      try {
        const serverPosts = await fetchPosts(); // Fetch posts data
        setPosts(serverPosts); // Update the posts state with fetched data
      } catch (error) {
        console.error("Error fetching posts:", error); // Log any errors that occur during fetching
      }
    };

    refreshPosts(); // Call the refreshPosts function to fetch posts data
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to render posts
  const renderPosts = () =>
    posts ? (
      // If posts data is available, map through each post and render a Post component for each
      posts.map((post) => <Post key={post._id} {...post} />)
    ) : (
      // If posts data is not available, display a loading message
      <p>Loading...</p>
    );

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
      <div className="space-y-4">{renderPosts()}</div>
    </div>
  );
}

export default Feed;
