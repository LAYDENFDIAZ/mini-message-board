import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Post({ _id, title, content }) {
  return (
    <div className="py-6 mb-5 text-lg border">
      {/* Render the data */}
      <div>
        <Link to={`/posts/${_id}`}>
          <div key={title}>
            <h3>{title}</h3>
            <p>{content}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Post;
