// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/create-diary">Create Diary</Link>
        </li>
        <li>
          <Link to="/diaries">Diary List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
