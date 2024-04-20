import React from "react";
import Navbar from "../components/shared/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
