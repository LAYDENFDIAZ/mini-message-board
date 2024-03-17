// PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/outline"; // Make sure you have these icons
import Comment from "../components/comment";
import { fetchPost } from "../api";

function PostPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  const refreshPost = async () => {
    const post = await fetchPost(postId);
    setData(post);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      refreshPost();
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, []);

  if (loading) {
    return <div className="py-4 text-center">Loading post...</div>;
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        Error fetching post: {error}
      </div>
    );
  }

  const formattedDate = data?.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="max-w-4xl mx-auto my-8 bg-white border border-gray-200 rounded-md">
      <div className="flex p-4 md:p-6">
        <div className="flex flex-col items-center mr-4">
          <ArrowUpIcon className="w-6 h-6 cursor-pointer hover:text-blue-500" />
          <span className="text-sm font-semibold">{data.likes}</span>
          <ArrowDownIcon className="w-6 h-6 cursor-pointer hover:text-blue-500" />
        </div>
        <div>
          <h1 className="mb-2 text-xl font-bold md:text-2xl">{data.title}</h1>
          <p className="mb-4 text-gray-700">{data.content}</p>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Posted by <span className="text-blue-500">{data.author}</span> on{" "}
              <time dateTime={data.createdAt}>{formattedDate}</time>
            </span>
          </div>
        </div>
      </div>
      <section className="p-4 border-t md:p-6">
        <h2 className="mb-4 text-lg font-semibold md:text-xl">Comments</h2>
        {data.comments && data.comments.length > 0 ? (
          data.comments.map((comment, index) => (
            <Comment
              key={index}
              content={comment.content}
              author={comment.author}
              createdAt={comment.createdAt}
            />
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </section>
    </article>
  );
}

export default PostPage;
