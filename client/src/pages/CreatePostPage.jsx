import React, { useState } from "react";
import { createPost } from "../api";
import { Link } from "react-router-dom";

function CreatePostPage({ handleAddPost }) {
  // State variables to store form input values, error message, and success message
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent default form submission behavior

    // Input sanitization: Validate and clean user input
    const sanitizedTitle = title.trim(); // Trim leading/trailing whitespace
    const sanitizedContent = content.trim(); // Trim leading/trailing whitespace
    // Check to make sure we have a title and content
    if (!sanitizedTitle || !sanitizedContent) {
      setError("Please enter a title and content for your post.");
      return;
    }

    try {
      // Attempt to create a new post using the API function
      const newPost = await createPost({ title: sanitizedTitle, content: sanitizedContent });
      // If successful, update success message, clear input fields, and reset error
      setSuccessMessage("Post created successfully!");
      setTitle("");
      setContent("");
      setError(null);
      handleAddPost(newPost)
    } catch (error) {
      // If an error occurs, update error message and log the error
      setError("Error creating post. Please try again.");
      console.error("Error creating post", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="px-8 py-6 bg-white rounded shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-center">
            Create a New Post
          </h2>
          {/* Display error message if there is one */}
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          {/* Display success message if there is one */}
          {successMessage && (
            <p className="mb-4 text-sm text-green-500">{successMessage}</p>
          )}
          {/* Form for creating a new post */}
          <form onSubmit={handleSubmit}>
            {/* Title input field */}
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block mb-2 font-bold text-gray-700"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                placeholder="Enter post title"
                required
              />
            </div>
            {/* Content input field */}
            <div className="mb-6">
              <label
                htmlFor="content"
                className="block mb-2 font-bold text-gray-700"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded appearance-none focus:outline-none focus:shadow-outline"
                rows="4"
                placeholder="Enter post content"
                required
              />
            </div>
            {/* Button to submit the form */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                Create Post
              </button>
              {/* Link to return to the home page */}
              <Link
                to="/"
                className="inline-block ml-4 text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
              >
                Return to Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;
