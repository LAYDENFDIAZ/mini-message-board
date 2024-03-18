import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/outline";
import Comment from "../components/comment";
import { fetchPost, addComment } from "../api";
import NavBar from "../components/NavBar";

function PostPage() {
  // State variables to store post data, loading status, error message, comment input, and post ID
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const { postId } = useParams();

  // Function to fetch post data from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading status to true while fetching data
      try {
        // Fetch post data using the provided post ID
        const postData = await fetchPost(postId);
        // Filter out null comments and update post data
        postData.comments = postData.comments.filter(
          (comment) => comment != null
        );
        setData(postData);
      } catch (err) {
        // If an error occurs, set the error message
        setError(err.message);
      } finally {
        setLoading(false); // Set loading status to false when fetching is done
      }
    };

    fetchData(); // Invoke the fetchData function
  }, [postId]); // Run the effect whenever the post ID changes

  // Function to handle adding a new comment
  const handleAddComment = async () => {
    if (commentInput.trim()) {
      try {
        // Attempt to add a new comment using the API function
        await addComment(postId, { content: commentInput });
        setCommentInput(""); // Clear the comment input field
        // Fetch updated post data to reflect the newly added comment
        const updatedPost = await fetchPost(postId);
        updatedPost.comments = updatedPost.comments.filter(
          (comment) => comment != null
        );
        setData(updatedPost); // Update post data with the new comment
      } catch (err) {
        console.error("Error adding comment:", err); // Log any errors that occur
      }
    }
  };

  // Format the date of the post
  const formattedDate = data?.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Render loading message if data is still being fetched
  if (loading) return <div className="py-4 text-center">Loading post...</div>;
  // Render error message if an error occurred while fetching data
  if (error)
    return (
      <div className="py-4 text-center text-red-500">
        Error fetching post: {error}
      </div>
    );

  // Render the post content and comments section
  return (
    <div>
      <NavBar /> {/* Render the navigation bar */}
      {/* Render the post content */}
      <article className="max-w-4xl mx-auto my-8 bg-white border border-gray-200 rounded-md">
        <div className="p-4 md:p-6">
          <h1 className="text-xl font-bold md:text-2xl">{data?.title}</h1>
          <p className="text-gray-700">{data?.content}</p>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Posted by <span className="text-blue-500">{data?.author}</span> on{" "}
              {formattedDate}
            </span>
          </div>
        </div>
        {/* Render the comments section */}
        <section className="p-4 border-t md:p-6">
          <h2 className="mb-4 text-lg font-semibold md:text-xl">Comments</h2>
          {/* Render comments or "No comments yet" message */}
          {data?.comments && data.comments.length > 0 ? (
            data.comments.map((comment, index) => (
              <div
                key={index}
                className="p-2 pl-4 my-2 border-l-4 border-blue-500 rounded-md bg-gray-50"
              >
                {/* Render individual comment component */}
                <Comment
                  content={comment.content}
                  author={comment.author || "Anonymous"}
                  createdAt={
                    comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString("en-US")
                      : ""
                  }
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
          {/* Input field for adding a new comment */}
          <div className="mt-4">
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              rows={3}
            />
            {/* Button to submit the new comment */}
            <button
              onClick={handleAddComment}
              className="px-4 py-2 mt-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
              disabled={!commentInput.trim()}
            >
              Add Comment
            </button>
          </div>
        </section>
      </article>
    </div>
  );
}

export default PostPage;
