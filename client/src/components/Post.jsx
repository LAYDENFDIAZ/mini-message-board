import React from "react";
import { Link } from "react-router-dom";

function Post({ _id, title, content, author, createdAt }) {
  return (
    <Link to={`/posts/${_id}`}>
      <div className="p-4 mb-4 transition duration-300 bg-white border border-gray-200 rounded-md shadow-md hover:shadow-lg">
        <div className="mb-2">
          {author && (
            <div className="text-sm text-blue-500">Posted by {author}</div>
          )}
          <div className="text-sm text-gray-600">{createdAt}</div>
        </div>
        <h2 className="mb-2 text-lg font-bold">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </Link>
  );
}

export default Post;
