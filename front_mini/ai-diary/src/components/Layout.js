// src/components/Layout.js
import React from "react";
import Navbar from "./NavBar";
import "../Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Layout;
