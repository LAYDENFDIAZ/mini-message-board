import React, { useState } from "react";

function Comment({ content, author, createdAt, onAddReply, commentId }) {
  const authorName = author || "Anonymous";
  const createdAtStr = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US")
    : "";
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const toggleReplyInput = () => {
    setShowReplyInput(!showReplyInput);
    setReplyContent("");
  };

  const handleReplySubmit = () => {
    onAddReply(commentId, replyContent);
    setReplyContent("");
    setShowReplyInput(false);
  };

  return (
    <div className="comment">
      <p>{content}</p>
      <div className="flex items-center justify-between mb-2">
        <span>{author || "Anonymous"}</span>
        <span>{createdAt}</span>
      </div>
      <button
        onClick={toggleReplyInput}
        className="px-2 py-1 text-blue-500 rounded hover:text-blue-600 focus:outline-none focus:ring focus:border-blue-500"
      >
        Reply
      </button>
      {showReplyInput && (
        <div className="mt-4">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Type your reply..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            rows={3}
          />
          <button
            onClick={handleReplySubmit}
            className="px-2 py-1 font-semibold text-green-500 rounded hover:text-green-600 focus:outline-none focus:ring focus:border-green-500"
          >
            Submit Reply
          </button>
        </div>
      )}
    </div>
  );
}

export default Comment;
