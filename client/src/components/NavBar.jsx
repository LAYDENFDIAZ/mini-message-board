import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="p-4 border-b">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-2xl font-bold">
          <Link to="/">Repostopia</Link>
        </h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-red-500">
            Home
          </Link>
          <Link to="/create-post" className="hover:text-red-500">
            Create Post
          </Link>
          <Link to="/users/register" className="hover:text-red-500">
            Register
          </Link>
          <Link to="/users/login" className="hover:text-red-500">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
