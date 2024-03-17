import React from "react";

function Comment({ content, author, createdAt }) {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="p-4 mb-4 rounded-md last:mb-0 bg-gray-50">
      <p className="text-gray-800">{content}</p>
      <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
        <span>Comment by {author}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}

export default Comment;
