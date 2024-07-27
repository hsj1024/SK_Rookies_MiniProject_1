import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Welcome {user ? user.username : "Guest"}!</h1>
      {user ? (
        <div>
          <Link to="/create-diary">Create Diary</Link>
          <Link to="/diaries">View Diaries</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
