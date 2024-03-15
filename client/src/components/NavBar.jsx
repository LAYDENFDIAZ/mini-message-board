import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom if you're using it for navigation

function NavBar() {
  return (
    <nav className="p-4 text-white bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        <h1 className="text-2xl font-bold">
          <Link to="/">YourApp</Link> {/* Replace with your logo or app name */}
        </h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-red-500">
            Home
          </Link>{" "}
          {/* Update with actual paths */}
          <Link to="/about" className="hover:text-red-500">
            About
          </Link>{" "}
          {/* Update with actual paths */}
          {/* Add more navigation links as needed */}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
